import { reactive } from 'vue'
import { personalData } from '@/Data/personal'
import deepClone from '../MacroTracker/deepClone'

export const projectToShow = reactive(deepClone(personalData.projects['Refactoring Macro Tracker']))
