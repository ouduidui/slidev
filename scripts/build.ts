#!/usr/bin/env zx

import { $ } from 'zx'
import { getSlidesPath } from './common'

const main = async () => {
  console.log('run slidev build...')

  const slidesPath = getSlidesPath()
  if(!slidesPath.length) {
    console.log('no slide file in folder...')
    return;
  }

  const process:Array<() => Promise<void>> = []

  for(const item of slidesPath) {
    process.push(async () => {
      console.log(`start build ${item.fileName}...`)
      await $`slidev build ${item.path} --base /${item.fileName} --out ../../dist/${item.fileName}`
      console.log(`${item.fileName} build done...`)
    })
  } 

  process.push(async () => {
    console.log('start build home page')
    await $`gulp`
    console.log('home page build done')
  })

  await Promise.allSettled(process.map(p => p()))
  console.log('build done')
}

main()