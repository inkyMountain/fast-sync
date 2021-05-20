<template>
  <div class="life">
    <div class="state">当前状态：{{ lifeService.state.value }}</div>
    <div class="context" v-for="(value, key) in context" :key="key">
      <div>{{ key }} ==> {{ value }}</div>
    </div>
    <div class="buttons">
      <template v-for="event in events">
        <div :key="event" style="margin: 20px 0">
          <button class="event" @click="onButtonClick(event)">
            {{ event }}
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createMachine, interpret, assign } from 'xstate'
import { Model } from 'xstate/lib/model'
import type { StateMachine, Interpreter } from 'xstate'

interface LifeMachineContext {
  housePrice: number
  carPrice: number
  money: number
}

type LifeMachineEvent = {
  type:
    | 'goToSchool'
    | 'graduate'
    | 'offWork'
    | 'onWork'
    | 'getMarried'
    | 'pregnancy'
    | 'giveBirth'
    | 'die'
    | 'salary'
    | 'stock'
}

interface LifeMachineSchema {
  states: {
    born: {}
    student: {}
    work: {}
    life: {}
    married: {}
    pregnant: {}
    parent: {}
    dead: {}
  }
}
type LifeMachine = StateMachine<
  LifeMachineContext,
  LifeMachineSchema,
  LifeMachineEvent
>

export default Vue.extend({
  data(): {
    fsm: LifeMachine
    lifeService: Interpreter<
      LifeMachineContext,
      LifeMachineSchema,
      LifeMachineEvent
    >
    events: Array<LifeMachineEvent['type']>
    context: LifeMachineContext
    [key: string]: any
  } {

    const fsm = createMachine<
      Model<any, any, any>,
      LifeMachineContext,
      LifeMachineEvent
    >(
      {
        id: 'life',
        initial: 'born',
        context: {
          // 北京郊区房价
          housePrice: 500 * 10000,
          // 车价
          carPrice: 20 * 10000,
          // 你的钱包
          money: 0,
        },
        states: {
          born: {
            on: {
              goToSchool: {
                target: 'student',
              },
            },
          },
          student: {
            on: {
              graduate: {
                target: 'work',
              },
            },
          },
          work: {
            on: {
              offWork: {
                target: 'life',
              },
              salary: {
                actions: [
                  'onSalary',
                  assign({
                    money(context) {
                      return context.money + 10000
                    },
                  }),
                ],
              },
            },
          },
          life: {
            on: {
              onWork: {
                target: 'work',
              },
              getMarried: {
                target: 'married',
                cond(context, event) {
                  const { housePrice, carPrice, money } = context
                  const canGetMarried = money > housePrice + carPrice
                  console.log('canGetMarried', canGetMarried)
                  if (canGetMarried) {
                    console.log('赢取了白富美👩')
                  } else {
                    console.log(
                      `你还差${housePrice + carPrice - money}元可以结婚`
                    )
                  }
                  return canGetMarried
                },
                actions: [
                  assign({
                    money(context) {
                      console.log(
                        `🎎 结婚花了${context.housePrice - context.carPrice}元`
                      )
                      return (
                        context.money - context.housePrice - context.carPrice
                      )
                    },
                  }),
                ],
              },
              salary: {
                actions: [
                  'onSalary',
                  assign({
                    money(context) {
                      return context.money + 10000
                    },
                  }),
                ],
              },
              stock: {
                actions: [
                  assign({
                    money(context) {
                      console.log('炒股赚了一千万💰')
                      return context.money + 1000 * 10000
                    },
                  }),
                ],
              },
            },
          },
          married: {
            on: {
              pregnancy: {
                target: 'pregnant',
                actions: ['onPregnancy'],
              },
            },
          },
          pregnant: {
            on: {
              giveBirth: {
                target: 'parent',
                actions: [
                  'onGiveBirth'
                ]
              },
            },
          },
          parent: {
            on: {
              die: {
                target: 'dead',
              },
            },
          },
          dead: {
            type: 'final',
          },
        },
      },
      {
        actions: {
          onSalary(context, options, { action, state }) {
            const { housePrice, carPrice, money } = context
            console.log('发工资啦💰！！！')
            console.log(
              '距离 🏠 和 🚗 还需要  ==>',
              housePrice + carPrice - money
            )
          },
          onPregnancy(context, options, { action, state }) {
            console.log('老婆怀孕了🤰')
          },
          onGiveBirth(context, options, { action, state }) {
            console.log('孩子出生🐣 ' + (Math.random() > 0.5 ? '🧒 ' : '👶 '))
          },
        },
      }
    )
    const lifeService = interpret(fsm)

    lifeService.start()
    // => 'born'

    return {
      fsm,
      lifeService,
      context: fsm.context,
      // interval,
      events: [
        'goToSchool',
        'graduate',
        'offWork',
        'onWork',
        'salary',
        'getMarried',
        'stock',
        'pregnancy',
        'giveBirth',
        'die',
      ],
    }
  },

  created() {
    this.lifeService.onTransition((state) => {
      // Update the context component data property with the updated context
      this.context = state.context
    })
  },

  methods: {
    onButtonClick(event: LifeMachineEvent['type']) {
      this.lifeService.send(event)
    },
  },
})
</script>

<style lang="scss">
.life {
  height: 100vh;
  padding: 20px;
  .state {
    color: rgb(50, 102, 212);
  }
}
</style>
