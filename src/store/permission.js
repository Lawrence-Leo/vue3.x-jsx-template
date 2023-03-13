import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";
import { asyncRoutes, constantRoutes } from "@/router";

export default defineStore('permission',() => {
    const state = reactive({
      // routes: [],
      routes: constantRoutes,
      addRoutes: [],
    });

    const permission_routes = computed(() => state.routes);

    const hasPermission = function (roles, route) {
      if (route.meta && route.meta.roles) {
        return roles.some((role) => route.meta.roles.includes(role));
      } else {
        return true;
      }
    };

    const filterAsyncRoutes = function(routes,roles){
       const res = [];
       routes.forEach((route) => {
         const tmp = { ...route };
         if (hasPermission(roles, tmp)) {
           if (tmp.children) {
             tmp.children = filterAsyncRoutes(tmp.children, roles);
           }
           res.push(tmp);
         }
       });
       return res;
    }

    const generateRoutes = function (roles) {
      return new Promise((resolve) => {
        let accessedRoutes;
        if (roles.includes("admin")) {
          accessedRoutes = asyncRoutes || [];
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
        }
        state.addRoutes = accessedRoutes;
        state.routes = constantRoutes.concat(accessedRoutes);
        resolve(accessedRoutes);
      });
    };

    return {
      state,
      permission_routes,
      hasPermission,
      filterAsyncRoutes,
      generateRoutes,
    };
})