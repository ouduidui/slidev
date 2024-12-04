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

  await $`slidev build ${slidesPath.map(item => item.path).join(' ')}`
}

main()