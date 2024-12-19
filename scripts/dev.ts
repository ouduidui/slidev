#!/usr/bin/env zx

import { $ } from 'zx'
import { getSlidesPath } from './common'
import inquirer from 'inquirer'

$.verbose = true;

const main = async () => {
  console.log('run slidev dev...')

  const slidesPath = getSlidesPath()
  if(!slidesPath.length) {
    console.log('no slide file in folder...')
    return;
  }

  const answers = await inquirer.prompt([{
    type: 'list',
    name: 'slide',
    message: 'choose a slide to run:',
    choices: slidesPath.map(i => i.fileName)
  }])

  const { slide } = answers;
  if(!slide) {
    console.error('not choose any slide...')
    return;
  }

  const slidePath = slidesPath.find(item => item.fileName === slide)?.path
  if(!slidePath) {
    console.error('not find this slide...')
    return;
  }

  await $`slidev ${slidePath} --open`
}

main()