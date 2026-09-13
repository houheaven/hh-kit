
/* eslint-disable accessor-pairs */

// 核心业务逻辑示例:后续跨框架复用的逻辑放这里(状态机、验证器、格式化等)
export interface Counter {
  readonly value: number;
  increment: () => number;
  decrement: () => number;
  reset: () => void;
}

export function createCounter(initial = 0): Counter {
  let count = initial;
  return {
    get value(): number {
      return count;
    },
    increment: (): number => ++count,
    decrement: (): number => --count,
    reset: (): void => {
      count = initial;
    },
  };
}
