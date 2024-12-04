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
     await $`slidev build ${item.path} --base /demo --out ../../dist/demo`
  } 
}

main()