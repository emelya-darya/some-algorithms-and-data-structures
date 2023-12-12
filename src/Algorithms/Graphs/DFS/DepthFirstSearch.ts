import { Stack } from './../../../DataStructures/Stack/Stack'

type GraphType = { [key: string]: Array<string> }
type ReachableVrtxsType = { [key: string]: true }

/*
  if reachableFrom - is a string with the name of the vertex, then a list of vertices reachable from the given one will be returned
  else if reachableFrom === null - will return a list of all reachable vertices of the graph
*/
export const dfs = function (graph: GraphType, reachableFrom: string | null = null) {
   const vrtxsStack = new Stack<string, any>()
   const reachableVrtxs: ReachableVrtxsType = {}

   if (reachableFrom === null) {
      for (const vrtx in graph) {
         vrtxsStack.put(vrtx)
         reachableVrtxs[vrtx] = true
      }
   } else {
      vrtxsStack.put(reachableFrom)
      reachableVrtxs[reachableFrom] = true
   }

   while (!vrtxsStack.isEmpty()) {
      const currVrtx = vrtxsStack.extract() || ''
      const currVrtxsNeighbours = graph[currVrtx]

      if (Array.isArray(currVrtxsNeighbours)) {
         currVrtxsNeighbours.forEach(nb => {
            if (!reachableVrtxs[nb]) {
               reachableVrtxs[nb] = true
               vrtxsStack.put(nb)
            }
         })
      }
   }

   const output: Array<string> = []
   for (const vrtx in reachableVrtxs) output.push(vrtx)

   return output
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

const testGraph = {
   a: ['b', 'c'],
   b: ['f'],
   c: ['d', 'e'],
   d: ['f'],
   e: ['f'],
   f: ['g'],
}

/*
      console.log(dfs(testGraph))
  
     *Result 
     [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]
  
     !=============================================================================================
  
     console.log(dfs(testGraph, 'c'))
     *Result  
     [ 'c', 'd', 'e', 'f', 'g' ]
  */
