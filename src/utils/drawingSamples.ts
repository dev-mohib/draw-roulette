import drawing1 from '../assets/drawing/drawing1.jpg'
import drawing2 from '../assets/drawing/drawing2.png'
import drawing3 from '../assets/drawing/drawing3.jpg'
import drawing4 from '../assets/drawing/drawing4.png'
import drawing5 from '../assets/drawing/drawing5.png'
import drawing6 from '../assets/drawing/drawing6.jpg'
import drawing7 from '../assets/drawing/drawing7.jpg'
import drawing8 from '../assets/drawing/drawing8.png'
import drawing9 from '../assets/drawing/drawing9.jpg'
import drawing10 from '../assets/drawing/drawing10.png'
import drawing11 from '../assets/drawing/drawing11.jpg'
import drawing12 from '../assets/drawing/drawing12.png'
import drawing13 from '../assets/drawing/drawing13.jpg'
import drawing14 from '../assets/drawing/drawing14.webp'
import { GoogleDriveResponse } from 'types/index'

export const drawingSamples = [drawing1, drawing2, drawing3, drawing4, drawing5, drawing6, drawing7, drawing8, drawing9, drawing10, drawing11, drawing12, drawing13, drawing14];

export function shuffle(array : GoogleDriveResponse[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }