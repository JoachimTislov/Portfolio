import type { ComponentOptionsBase, ComponentPublicInstance, Ref } from 'vue'

type vueElement =
  | Element
  | ComponentPublicInstance<
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      {},
      false,
      ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>,
      {},
      {}
    >
  | null

export function setElementReference(element: vueElement, divRef: Ref<HTMLElement | null>) {
  divRef.value = element as HTMLElement
  return divRef
}
