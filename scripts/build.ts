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

  for(const item of slidesPath) {
    console.log(`start build ${item.fileName}...`)
    await $`slidev build ${item.path} --base /${item.fileName} --out ../../dist/${item.fileName}`
    console.log(`${item.fileName} build done...`)
  } 
}

main()