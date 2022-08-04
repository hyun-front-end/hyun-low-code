import { defineComponent } from 'vue';
import { NCard, NIcon } from 'naive-ui';
import FreshDraggable from 'vuedraggable';
import { ExtensionPuzzleOutline } from '@vicons/ionicons5';
import { baseCpnConfig } from '../../../config/componentConfig';

import('./style/index.less');

export default defineComponent({
  setup() {
    return () => (
      <>
        <NCard
          class="right-component-container"
          v-slots={{
            header: () => (
              <div>
                <NIcon>
                  <ExtensionPuzzleOutline />
                </NIcon>
                <span>基础组件</span>
              </div>
            ),
          }}
        >
          <FreshDraggable
            class="dragArea list-group"
            list={baseCpnConfig.value}
            group={{ name: 'people', pull: 'clone', put: false }}
            item-key="label"
            sort={false}
            v-slots={{
              item: ({ element }) => (
                <div class="elements-item">
                  <div class="components-body">
                    {/*{element.icon ? <GIcon icon={element.icon} size={12}></GIcon> : null}*/}
                    <span class="components-body-text">{element.label}</span>
                  </div>
                </div>
              ),
            }}
          />
        </NCard>
      </>
    );
  },
});
