import { Queue } from './../../../DataStructures/Queue/Queue'
import { Graph, UnweightedGraphType } from '../../../DataStructures/Graph/Graph'

export const bfs = function (graph: UnweightedGraphType, start: string) {
   const pointsQueue = new Queue<string, any>()
   pointsQueue.enqueue(start)

   const paths: { [key: string]: Array<string> } = { [start]: [start] }

   while (!pointsQueue.isEmpty()) {
      const currPoint = pointsQueue.dequeue() || ''
      const neighbours = graph[currPoint] || []

      neighbours.forEach(neighbour => {
         if (paths[neighbour] === undefined) {
            paths[neighbour] = [...paths[currPoint].map(el => String(el)), String(neighbour)]
            pointsQueue.enqueue(String(neighbour))
         }
      })
   }

   return paths
}

/*
 ? **************************************************************************************************************************
 ? **************************************************************************************************************************
 ? **************************************************************************************************************************
 ? ************************************************* Usage examples *********************************************************
 ? **************************************************************************************************************************
 ? **************************************************************************************************************************
 ? **************************************************************************************************************************
 ? **************************************************************************************************************************
 */

const testGraph = new Graph({
   a: ['b', 'c'],
   b: ['f'],
   c: ['d', 'e'],
   d: ['f'],
   e: ['f'],
   f: ['g'],
}).getUnweightedGraphForm()

/*
    console.log(bfs(testGraph, 'a'))

   *Result 
   {
      a: [ 'a' ],
      b: [ 'a', 'b' ],
      c: [ 'a', 'c' ],
      f: [ 'a', 'b', 'f' ],
      d: [ 'a', 'c', 'd' ],
      e: [ 'a', 'c', 'e' ],
      g: [ 'a', 'b', 'f', 'g' ]
   }

   !=============================================================================================

   console.log(bfs(testGraph, 'b'))
   *Result  
   {
      b: ['b'],
      f: ['b', 'f'],
      g: ['b', 'f', 'g'],
   }
*/
