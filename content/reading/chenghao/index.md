---
title: 陈皓（左耳朵耗子）
---

import { LandingCard, LandingCards } from '../../../components/landing-cards'
import {
  SectionHero,
  SectionHeroEyebrow,
  SectionHeroLead,
  SectionHeroTag,
  SectionHeroTags,
  SectionHeroTitle,
} from '../../../components/section-hero'
import { Users, Compass, Clock, Lightbulb, Trophy, Flame, Coins, GraduationCap, MessageCircle, Flag } from 'lucide-react'

<SectionHero tone="blue">
  <SectionHeroEyebrow>左耳听风</SectionHeroEyebrow>
  <SectionHeroTitle>陈皓（左耳朵耗子）</SectionHeroTitle>
  <SectionHeroLead>
    资深技术人，MegaEase 创始人。长期深耕分布式系统、云原生架构与工程师成长话题，极客时间专栏《左耳听风》影响了无数程序员。
  </SectionHeroLead>
  <SectionHeroTags>
    <SectionHeroTag>技术领导力</SectionHeroTag>
    <SectionHeroTag>工程师成长</SectionHeroTag>
    <SectionHeroTag>时间管理</SectionHeroTag>
    <SectionHeroTag>三观与价值</SectionHeroTag>
  </SectionHeroTags>
</SectionHero>

<LandingCards columns={2}>
  <LandingCard tone="orange" title="程序员如何用技术变现" href="/reading/chenghao/tech-monetization" icon={Coins}>
    从学生时代帮人打字到日薪十万的技术咨询——手艺人的变现之路和九条实操建议。
  </LandingCard>

  <LandingCard tone="sky" title="如何才能拥有技术领导力" href="/reading/chenghao/tech-leadership" icon={Trophy}>
    吃透基础技术、提高学习能力、坚持做正确的事、高标准要求自己——技术领导力的四大支柱。
  </LandingCard>

  <LandingCard tone="blue" title="如何成为大家愿意追随的 Leader" href="/reading/chenghao/leader-vs-boss" icon={Users}>
    Leader 与 Boss 的本质区别，以及成为众人愿意追随的技术领导者所需的关键素质。
  </LandingCard>

  <LandingCard tone="rose" title="答疑：渴望、热情和选择" href="/reading/chenghao/desire-passion-choice" icon={Flame}>
    没时间学习？问题不在时间在渴望。写作的四阶段进化，人生两段论与五条选择建议。
  </LandingCard>

  <LandingCard tone="purple" title="谈谈我的「三观」" href="/reading/chenghao/my-three-views" icon={Lightbulb}>
    不惑之年的思考快照：面对世界、社会、人生的态度，以及挣钱、技术、职业、创业的价值取向。
  </LandingCard>

  <LandingCard tone="emerald" title="时间管理：同扭曲时间的事儿抗争" href="/reading/chenghao/time-management-1" icon={Clock}>
    如何争取更多可控时间：主动管理信息与同事，学会有技巧地说"不"，应对加班与低效会议。
  </LandingCard>

  <LandingCard tone="amber" title="时间管理：如何利用好自己的时间" href="/reading/chenghao/time-management-2" icon={Compass}>
    如何投资时间：学基础、做自动化、关注长期成长，以及将军赶路不追小兔的专注法则。
  </LandingCard>

  <LandingCard tone="teal" title="高效学习" href="/reading/chenghao/effective-learning" icon={GraduationCap}>
    端正学习态度、回归信息源头、深度归纳实践、阅读代码方法、应对枯燥知识——5 篇合并精读。
  </LandingCard>

  <LandingCard tone="indigo" title="高效沟通" href="/reading/chenghao/effective-communication" icon={MessageCircle}>
    Talk 和 Code 同等重要、沟通阻碍与应对、沟通方式技巧、好老板善提问、好好说话——6 篇合并精读。
  </LandingCard>

  <LandingCard tone="zinc" title="结束语：业精于勤，行成于思" href="/reading/chenghao/ending" icon={Flag}>
    你不需要努力，只需要正常。知识像阳光空气一样免费，稀缺的是获取能力和坚持的意志。
  </LandingCard>
</LandingCards>
