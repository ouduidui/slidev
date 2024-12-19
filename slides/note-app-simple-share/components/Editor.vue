<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import Quill, { Delta, Op } from 'quill';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css';

const initialContent = [
    {
        "insert": "Title"
    },
    {
        "attributes": {
            "header": 1
        },
        "insert": "\n"
    },
    {
        "insert": "Subtitle"
    },
    {
        "attributes": {
            "header": 2
        },
        "insert": "\n"
    },
    {
        "insert": "This is a "
    },
    {
        "attributes": {
            "bold": true
        },
        "insert": "content"
    },
    {
        "insert": "...\n"
    },
    {
        "attributes": {
            "italic": true
        },
        "insert": "Hello"
    },
    {
        "insert": " "
    },
    {
        "attributes": {
            "italic": true
        },
        "insert": "World"
    },
    {
        "insert": "...\n"
    }
]

let editor:Quill | null =  null
const ops = ref<Op[] | null>(null)

const setContents = (delta?: Delta) => {
  const newOps = delta?.ops ?? null
  if(!newOps) {
    ops.value = newOps
  }

  ops.value = newOps?.reduce<{ops: Op[], line: Op[]}>((acc, cur) => {
    if(typeof cur.insert === 'string' && cur.insert.lastIndexOf('\n') === cur.insert.length - 1) {
      const {insert, attributes} = cur;
      const line = [...acc.line]
      acc.line = []
      const lastOne = line[line.length - 1];
      let deleteNewline = false
      if(lastOne && !lastOne.attributes && typeof lastOne.insert === 'string') {
        lastOne.insert = lastOne.insert + insert
        deleteNewline = true;
      }

      if(attributes) {
        line.forEach((item) => {
          item.attributes = item.attributes ? {...item.attributes, attributes} :  attributes
        })
      }
     
      acc.ops.push(...line)
      if(!deleteNewline) {
        acc.ops.push(cur)
      }
    }else {
      acc.line.push(cur)
    }
    return acc;
  }, {ops: [], line: []}).ops ?? null
}

const onTextChange = () => {
  setContents(editor?.getContents())
}

onMounted(() => {
   editor = new Quill('#editor', {
    modules: {
      toolbar: [
        [{header: [1, 2, false]}],
        ['bold', 'italic', 'underline'],
      ]
    },
    theme: 'snow'
  })
  editor.setContents(initialContent)
  setContents(editor.getContents())
  editor.on('text-change', onTextChange)
})

onUnmounted(() => {
  editor?.off('text-change', onTextChange)
  editor = null
})
</script>

<template>
  <div class="box">
    <div class="input">
      <div id="editor" class="editor"></div>
    </div>
    <div class="output">
      <div class="output-title">output:</div>
      <div class="output-content" v-if="ops?.length">
        <div v-for="op in ops">
          {{ JSON.stringify(op) }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  height: 80%;
}

.input {
  height: 100%;
}

.output {
  min-width: 0;
  white-space: pre-wrap;
}

.output-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.output-content {
  font-size: 14px
}
</style>