import { Book } from '../types/types';

export const BOOKS_MOCK: Book[] = [
  {
    id: "111",
    author: 'Agatha Christie',
    title: 'Murder on the Orient Express',
    description: 'The classic, the best. Nobody does it better than Dame Agatha, who wrote in her autobiography, “To travel by train is to see nature and human beings, towns and churches and rivers - in fact, to see life."',
    genre: 'detective',
    price: 20,
    img: 'https://m.media-amazon.com/images/I/51GIWJaVDhL._SX330_BO1,204,203,200_.jpg'
  },
  {
    id: "2",
    author: 'Agatha Christie',
    title: 'And Then There Were None',
    description: '"If you’re one of the few who haven’t experienced the genius of Agatha Christie, this novel is a stellar starting point." — DAVID BALDACCI, #1 New York Times Bestselling Author. Ten people, each with something to hide and something to fear, are invited to an isolated mansion on Indian Island by a host who, surprisingly, fails to appear.',
    genre: 'detective',
    price: 35,
    img: 'https://m.media-amazon.com/images/I/51MlxNgCsyL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg'
  },
  {
    id: "3",
    author: 'Ian Fleming',
    title: 'James Bond: Casino Royale',
    description: 'Ian Fleming\'s literary debut of British Secret Service agent 007 is stylishly adapted to the sequential art medium by Van Jensen and Matt Southworth in the official James Bond: Casino Royale graphic novel. Sent to a French casino in Royale-les-Eaux, Bond aims to eliminate the threat of the deadly Le Chiffre by bankrupting the ruthless SMERSH operative at the baccarat table. However, when the luck of the draw favors his enemy, 007 becomes the target of assassins and torturers in a high-stakes game of cat-and-mouse',
    genre: 'detective',
    price: 25,
    img: 'https://m.media-amazon.com/images/I/51CTwwSeS8S.jpg'
  }
]
