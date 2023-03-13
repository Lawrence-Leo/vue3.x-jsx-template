import { ref, reactive, computed,watch } from "vue";
import { defineStore } from "pinia";

export default defineStore("tagsView",()=>{
    const state = reactive({
      visitedViews: [],
      cachedViews: [],
      currentView: {},
    });

    const visitedViews = computed(() => state.visitedViews);
    
    const cachedViews = computed(() => state.cachedViews);

    const currentView = computed(() => state.currentView);

    const addView = function(view){
        addVisitedView(view)
        addCachedView(view)
    }

    const addCurrentView = function (view) {
      return new Promise(resolve => {
        state.currentView = view;
        resolve()
      });
    };

    const addVisitedView = function(view){
      if (state.visitedViews.some((v) => v.path === view.path)) return;
      state.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || "no-name",
        })
      );
    }

    const addCachedView = function(view){
        if (state.cachedViews.includes(view.name)) return;
        if (!view.meta.noCache) {
          state.cachedViews.push(view.name);
        }
    }

    const delView = function(view){
        return new Promise(resolve => {
            delVisitedView(view)
            delCachedView(view)
            resolve({
              visitedViews: [...state.visitedViews],
              cachedViews: [...state.cachedViews],
            });
        })
    }

    const delVisitedView = function(view){
      return new Promise(resolve => {
        for (const [i, v] of state.visitedViews.entries()) {
          if (v.path === view.path) {
            state.visitedViews.splice(i, 1);
            break;
          }
        }
        resolve([...state.visitedViews]);
      })
    }

    const delCachedView = function(view){
        return new Promise(resolve => {
            const index = state.cachedViews.indexOf(view.name);
            index > -1 && state.cachedViews.splice(index, 1);
            resolve([...state.cachedViews]);
        })
    }

    const delOthersViews = function(view){
        return new Promise(resolve => {
           delOthersVisitedViews(view);
           delOthersCachedViews(view);
           resolve({
             visitedViews: [...state.visitedViews],
             cachedViews: [...state.cachedViews],
           });
        })
    }

    const delOthersVisitedViews = function(view){
        return new Promise((resolve) => {
          state.visitedViews = state.visitedViews.filter((v) => {
            return v.meta.affix || v.path === view.path;
          });
          resolve([...state.visitedViews]);
        });
    }

    const delOthersCachedViews = function(view){
      return new Promise(resolve => {
        const index = state.cachedViews.indexOf(view.name)
        if (index > -1) {
          state.cachedViews = state.cachedViews.slice(index, index + 1)
        } else {
         // if index = -1, there is no cached tags
          state.cachedViews = []
        }
        resolve([...state.cachedViews])
      })
    }

    const delAllViews = function(view){
        return new Promise(resolve => {
            delAllVisitedViews(view)
            delAllCachedViews(view)
            resolve({
            visitedViews: [...state.visitedViews],
            cachedViews: [...state.cachedViews]
        })
      })
    }

    const delAllVisitedViews = function(){
       return new Promise(resolve => {
          const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
          state.visitedViews = affixTags
          resolve([...state.visitedViews])
    })
    }

    const delAllCachedViews = function() {
        return new Promise(resolve => {
        state.cachedViews = [];
        resolve([...state.cachedViews])
       })
    }

    const updateVisitedView = function(view){
        for (let v of state.visitedViews) {
          if (v.path === view.path) {
            v = Object.assign(v, view);
            break;
          }
        }
    }

    return {
      state,
      visitedViews,
      cachedViews,
      currentView,
      addCurrentView,
      addView,
      addVisitedView,
      addCachedView,
      delView,
      delVisitedView,
      delCachedView,
      delOthersViews,
      delOthersVisitedViews,
      delOthersCachedViews,
      delAllViews,
      delAllVisitedViews,
      delAllCachedViews,
      updateVisitedView,
    };
});