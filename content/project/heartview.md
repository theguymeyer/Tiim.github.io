---
route: heartview
title: Testing Pacemakers with HeartView
published: true
description: Developed a remote testing station to be used as a mechatronics lab for an online course at McMaster University
tags: MATLAB,
      Python,
      C++,
      STM32,
      Circuits,
      3D Design,
      Remote Learning
date: 2020-09-01
cover_image: "https://www.planetanalog.com/wp-content/uploads/2019/09/AnalogAngle138_FR-4_PCB_Fig1_770x507.jpg"
---

## Overview

A remote robotics lab that bring a new engaging learning experience to medical devices.

Robotics labs are a great way for students at university to gain practical experience. Unfortunately, many labs do not allow the students to feel engaged during development and gain that practical experience. The corresponding course focuses on software development in safety-critical systems, where accuracy and documentation are paramount. 

## The Lab

The Pacemaker Design Challenge ([More Here...](http://sqrl.mcmaster.ca/pacemaker.htm)) published by Boston Scientific is a world-wide competition to design the best pacemaker. The essence of this challenge build the foundations of the course where students develop a pacemaker protoype over a semester-long project. 

Students are broken up into small team and given an microcontroller and the power of MATLAB Simulink to generate a design. Over the three years as a TA I've noticed the impact labs can have on students when done right. Our focus is to keep students engaged, curious, and motivated. As a result, we've had countless students value the lessons learned and highly rate the evaluations of this course.

## HeartView

Due to the global pandemic students are forced to study from home. Since the pacemaker development course is an essential component for our third year students we have decided to move this project into open-source and offer a new remote testing station for the pacemaker project. It was my pleasure to grab this project by the horns and drive it into completion over the summer leading up to September 2020.

<figure class="figure">
    <img class="figure-float" src="https://raw.githubusercontent.com/theguymeyer/guymeyer_CV/master/res/pacemaker/heartview_iso.png" alt="pacemaker testing station overview" width="70%"/>
    <figcaption class="caption">Screenshot of the HeartView testing station UI (src: Guy Meyer)</figcaption>
</figure>

HeartView in a turn-key solution to prototyping of pacemakers. The remote station is equipped with a pacemaker (FRDM K64F) and a heart (Nucleo F446RE). The user downloads the HeartView software, connects the heart to their computer and can dynamically adjust the pacing conditions of the heart. The purpose is to generate heart malfunctions that the pacemaker will fix (if designed correctly). 

The pacemaker can then be developed on the same computer with MATLAB Simulink or other development platforms and loaded on for real-time testing.

### Skills

**Technical** : hardware design (Fusion 360), electrical design (LTspice, Altium), STM32 development (GPIO, ADC, TIMERs, UART), UI programming (PyQt), System Integration

**Non-technical** : Procurement, Budgeting, Operations

<figure class="figure">
    <img src="https://raw.githubusercontent.com/theguymeyer/guymeyer_CV/master/res/pacemaker/heartview_topview_built.png" alt="pacemaker testing station topview" width="60%" description="test"/>
    <figcaption class="caption">Topview of standalone test station; pacemaker on left, heart on right (src: Guy Meyer)</figcaption>
</figure>

<figure class="figure">
    <img src="https://raw.githubusercontent.com/theguymeyer/guymeyer_CV/master/res/pacemaker/heartview_ui.png" alt="pacemaker testing station ui" width="90%" description="test"/>
    <figcaption class="caption">Screenshot of the HeartView testing station UI (src: Guy Meyer)</figcaption>
</figure>

<figure class="figure">
    <img src="https://raw.githubusercontent.com/theguymeyer/guymeyer_CV/master/res/pacemaker/heartview_overview.png" alt="pacemaker testing station ui" width="90%" description="test"/>
    <figcaption class="caption">Testing during development (src: Guy Meyer)</figcaption>
</figure>


## Some History...

### myRIO System

Every good development process needs an even better testing method. This was our issue for years! No way to provide the students with a confident and interactive way to test. In 2017 we built the first pacemaker testing station that allows the user to do just that. Check it out...

<figure class="figure">
    <img src="https://raw.githubusercontent.com/theguymeyer/guymeyer_CV/master/res/pacemaker/system4.jpg" alt="pacemaker testing station setup" width="48%" style="float: middle;"/>
    <img src="https://raw.githubusercontent.com/theguymeyer/guymeyer_CV/master/res/pacemaker/system5.jpg" alt="pacemaker testing station scope" width="48%" style="float: middle;"/>
    <figcaption class="caption">Heart signals generated on LabVIEW, all signals routed to oscilloscope for display (src: Guy Meyer)</figcaption>
</figure>


A dedicated real-time data acquisition system that works with two functions. Display pacemaker signals and generate mimiced heart signals as input to the pacemaker. With this station a student can perform functional testing on-the-fly. The quality of the course shot up and brought a new level engagement to the course.

<figure class="figure">
    <img src="https://raw.githubusercontent.com/theguymeyer/guymeyer_CV/master/res/pacemaker/system1.jpg" alt="pacemaker testing station overview" width="60%" description="test"/>
      <figcaption class="caption">Overview of desktop test station; pacemaker plugs into acrylic testing box (src: Guy Meyer)</figcaption>
</figure>

