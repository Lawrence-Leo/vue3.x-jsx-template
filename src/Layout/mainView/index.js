import { defineComponent, KeepAlive, createStaticVNode } from 'vue';
import { RouterView } from 'vue-router';

const mainView = defineComponent(() => {
  const render = () => (
    <RouterView>
      {{
        default: slot => {
          const { Component, route } = slot;
          let $view = null;
          if (Component) {
            if (route.meta?.cached) {
              $view = (
                <KeepAlive>
                  <Component />
                </KeepAlive>
              );
            } else {
              $view = <Component />;
            }
          } else {
            $view = createStaticVNode('<div></div>');
          }
          return $view;
        },
      }}
    </RouterView>
  );
  return render;
});

mainView.name = 'mainView';

export default mainView;
