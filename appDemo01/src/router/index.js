import Vue from 'vue'
import Router from 'vue-router'

import login from '@/pages/login'  //登录页
import index from '@/pages/index'  //首页

//基础数据管理
import Base from '@/pages/base'
import BaseSchool from '@/pages/base/school'
//年级
import BaseGrade from '@/pages/base/grade'
//班级管理
import BaseClazz from '@/pages/base/clazz'
//课程管理
import BaseCourse from '@/pages/base/course'
//教师管理
import BaseTeacher from '@/pages/base/teacher'
//问卷管理模块
import Questionnaire from '@/pages/questionnaire'

import Question from '@/pages/questionnaire/question'
//题库管理
import Bank from '@/pages/questionnaire/bank'
//课调管理模块
import Survey from '@/pages/survey'
//课调管理
import List from '@/pages/survey/list'
//可调监控
import Monitor from '@/pages/survey/monitor'
//课调审查
import Review from '@/pages/survey/review'

//课调统计
import Statistics from '@/pages/statistics'
//
import AllCourse from '@/pages/statistics/allCourse'



import System from '@/pages/system'

Vue.use(Router)

export default new Router({
  routes:[{
    path: '/',
    name: 'login',
    component: login
  },{
    path: '/app',
    name: 'index',
    component: index,
    children:[{
      // 基础数据模块
      path: 'base',
      name: 'Base',
      component: Base,
      children:[{
        //校园信息
        path: 'school',
        name: 'BaseSchool',
        component: BaseSchool
      },{
        //年级管理
        path: 'grade',
        name: 'BaseGrade',
        component: BaseGrade
      },{
        //班级管理
        path: 'clazz',
        name: 'BaseClazz',
        component: BaseClazz
      },{
        //课程理理
        path: 'course',
        name: 'BaseCourse',
        component: BaseCourse
      },{
        //教师管理
        path: 'teacher',
        name: 'BaseTeacher',
        component: BaseTeacher
      }]
    },{

      //问卷管理模块
      path: 'questionnaire',
      name: 'Questionnaire',
      component: Questionnaire,
      children:[{
        //问卷管理
        path: 'list',
        name: 'Question',
        component: Question
      },{
        //题库管理
        path: 'question',
        name: 'Bank',
        component: Bank
      }]
    },{
      //课调管理
      path: 'survey',
      name: 'Survey',
      component: Survey,
      children:[{
        path:'list',
        name:'List',
        component:List
      },{
        path:'monitor',
        name:'Monitor',
        component:Monitor
      },{
        path:'review',
        name:'Review',
        component:Review
      }]
    },{
      //课调统计
      path: 'statistics',
      name: 'Statistics',
      component: Statistics,
      children:[{
        path:'allCourse',
        name:'AllCourse',
        component:AllCourse
      }]
    },{
      path: 'system',
      name: 'System',
      component: System,
    }]
  }]
})
