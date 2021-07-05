const state = {
  wordtype: [{
    id: 1,
    label: '名词'
  }, {
    id: 2,
    label: '动词',
    children: [{
      id: 5,
      label: '他动词'
    }, {
      id: 6,
      label: '自动词'
    }]
  }, {
    id: 3,
    label: '形容词'
  },
  {
    id: 4,
    label: '副词'
  }],
  sentencetype: [
    { id: 1,
      label: '一般句'
    },
    { id: 2,
      label: '疑问句'
    },
    { id: 3,
      label: '感叹句'
    }
  ],
  tense: [
    { id: 1,
      label: '一般现在时'
    }
  ]
}

export default {
  namespaced: true,
  state
}
