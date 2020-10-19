<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateElement, VNode } from 'vue';

import IconFacebook from '../../_assets/icons/icon-facebook.svg';
import IconInstagram from '../../_assets/icons/icon-instagram.svg';
import IconKey from '../../_assets/icons/icon-key.svg';
import IconStore from '../../_assets/icons/icon-store.svg';
import IconDropdown from '../../_assets/icons/icon-dropdown.svg';
import IconSearch from '../../_assets/icons/icon-search.svg';
import IconClose from '../../_assets/icons/icon-close.svg';
import IconDistance from '../../_assets/icons/icon-distance.svg';
import IconBack from '../../_assets/icons/icon-back.svg';
import IconClock from '../../_assets/icons/icon-clock.svg';
import IconLocation from '../../_assets/icons/icon-location.svg';
import IconFilters from '../../_assets/icons/icon-filters.svg';
import IconWine from '../../_assets/icons/icon-wine.svg';
import IconBag from '../../_assets/icons/icon-bag.svg';

@Component({
  components: {
    'icon-facebook': IconFacebook,
    'icon-instagram': IconInstagram,
    'icon-key': IconKey,
    'icon-store': IconStore,
    'icon-dropdown': IconDropdown,
    'icon-search': IconSearch,
    'icon-close': IconClose,
    'icon-distance': IconDistance,
    'icon-back': IconBack,
    'icon-clock': IconClock,
    'icon-location': IconLocation,
    'icon-filters': IconFilters,
    'icon-wine': IconWine,
    'icon-bag': IconBag,
  },
})
export default class AppIcon extends Vue {
  @Prop() name!: string;

  @Prop() height!: string;

  /**
   * List of components to get text name for comparing
   */
  public componentsObj: any = this.$options.components;

  /**
   * Create span and <icon-***> component in span
   * params: elementName, options(class, etc), childrenElements
   * @param create - default callback for `render` function in vue.
   */
  public render(create: CreateElement): VNode {
    const iconName = this.generateIconName();
    return create('span', { class: `icon ${iconName}`, style: `height: ${this.height}px` }, [create(iconName)]);
  }

  public generateIconName(): any {
    const componentKeys = Object.keys(this.componentsObj);
    const componentName = `icon-${this.name}`;
    return componentKeys.includes(componentName) ? componentName : '';
  }
}
</script>

<style lang="sass" scoped>
.icon
  display: inline-flex
  vertical-align: middle
  justify-content: center
  align-items: center
  > svg
    height: 100%
/*
  Example of styling in nested components
  .icon/deep/ */
</style>
