// 核心业务逻辑示例:后续跨框架复用的逻辑放这里(状态机、验证器、格式化等)
export function createCounter(initial = 0) {
  let count = initial
  return {
    get value() {
      return count
    },
    increment: () => ++count,
    decrement: () => --count,
    reset: () => {
      count = initial
    },
  }
}
