<template>
  <div class="promise">
    <div class="state">{{ promiseService.state.value }}</div>
    <div class="buttons">
      <button class="resolve-event" @click="onButtonClick({ type: 'resolve' })">
        resolve
      </button>
      <button class="reject-event" @click="onButtonClick({ type: 'reject' })">
        reject
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createMachine, interpret, assign } from 'xstate'
import type { StateMachine, Interpreter } from 'xstate'
import { Model } from 'xstate/lib/model'

interface PromiseMachineContext {
  someContext: string
}
type PromiseMachineEvent = { type: 'resolve' | 'reject' }
interface PromiseMachineSchema {
  states: {
    resolved: {}
    rejected: {}
  }
}
type PromiseMachine = StateMachine<
  PromiseMachineContext,
  PromiseMachineSchema,
  PromiseMachineEvent
>

export default Vue.extend({
  data(): {
    fsm: PromiseMachine
    promiseService: Interpreter<
      PromiseMachineContext,
      PromiseMachineSchema,
      PromiseMachineEvent
    >
    [key: string]: any
  } {
    // 1. 创建一个状态机
    const fsm = createMachine<
      Model<any, any, any>,
      PromiseMachineContext,
      PromiseMachineEvent
    >(
      {
        id: 'promise',
        // 初始状态
        initial: 'pending',
        // 开始罗列状态机的各种状态
        states: {
          // pending 状态
          pending: {
            // action
            on: {
              // resolve 事件
              resolve: {
                // 发生 resolve 事件后，转换到 resolved 状态。
                target: 'resolved',
              },
              // 同上
              reject: {
                target: 'rejected',
              },
            },
          },
          // resolved 状态
          resolved: {
            // final 代表进入以后就出不去了
            type: 'final',
          },
          // rejected 状态
          rejected: {
            type: 'final',
          },
        },
      },
    )
    
    // 2. 使用一个状态机解释器来处理状态机，生成一个状态机服务。
    const promiseService = interpret(fsm)

    // 3. 启动状态机服务 (第4点见 methods)
    promiseService.start()
    // => 'pending'

    return {
      fsm,
      promiseService,
    }
  },

  created() {
    this.promiseService.onTransition((state) => {
      // Update the context component data property with the updated context
      this.context = state.context
    })
  },

  methods: {
    onButtonClick(event: PromiseMachineEvent) {
      // 4. 给状态机服务发送状态
      this.promiseService.send(event)
    },
  },
})
</script>

<style lang="scss">
.promise {
  height: 100vh;
}
</style>
