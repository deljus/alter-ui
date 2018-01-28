import React, { Component } from 'react';
import { Carousel } from 'antd';
import styled from 'styled-components';
import 'antd/lib/modal/style/css';

const BaseCarousel = styled(Carousel)`
.slick-slide {
    text-align: center;
    height: 250px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
} 
   .slick-slide h3 {
    color: #fff;
}
`;


const Whirligig = () => (
  <BaseCarousel vertical autoplay>
    <div><h3>1</h3></div>
    <div><h3>2</h3></div>
    <div><h3>3</h3></div>
    <div><h3>4</h3></div>
  </BaseCarousel>
);

export default Whirligig;
