import { createClient } from "@supabase/supabase-js";
import { ref } from "vue";
import type { ICounterItem } from "@/modules/counters/services/counters.types";

export function createCountersService(initPayload: { supabaseUrl: string; supabaseAnonKey: string }) {
  const client = createClient(initPayload.supabaseUrl, initPayload.supabaseAnonKey);
  const counters = ref<ICounterItem[]>([]);

  const onChange = (event: { record: ICounterItem }) => {
    const counter = counters.value.find(counter => counter.id === event.record.id);
    if (counter) counter.value = event.record.value;
  };

  const realtime = client.channel("realtime:public:counters", { selfBroadcast: true });

  // Кривой тайпинг supabase вынуждает ставить тсигнор, так как нету тайпинга функции он для двух аргументов, а с тремя не работает
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  realtime.on("UPDATE", onChange);
  realtime.subscribe();

  async function loadCounters() {
    const { data, error } = await client.from<ICounterItem>("counters").select("*").limit(3);

    if (error) throw new Error(error.toString());

    if (data) counters.value = data || [];
  }

  async function incrementCounter(payload: Pick<ICounterItem, "id">) {
    const currentCounter = counters.value.find(counter => counter.id === payload.id);
    if (!currentCounter) return;

    await client
      .from<ICounterItem>("counters")
      .update({ value: currentCounter.value + 1 })
      .eq("id", payload.id);
  }

  async function decrementCounter(payload: Pick<ICounterItem, "id">) {
    const currentCounter = counters.value.find(counter => counter.id === payload.id);
    if (!currentCounter) return;

    // По странным стечениям обстоятельств без await не работает
    await client
      .from<ICounterItem>("counters")
      .update({ value: currentCounter.value - 1 })
      .eq("id", payload.id);
  }

  return { counters, loadCounters, incrementCounter, decrementCounter };
}

let service!: ReturnType<typeof createCountersService>;

export function useCountersService() {
  const { APP_SUPABASE_ANON_KEY, APP_SUPABASE_URL } = import.meta.env;
  if (!service)
    service = createCountersService({ supabaseUrl: APP_SUPABASE_URL, supabaseAnonKey: APP_SUPABASE_ANON_KEY });

  return service;
}
