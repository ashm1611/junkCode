/* eslint-disable no-underscore-dangle */
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import isBrowser from '@bbb-app/utils/isBrowser';
import Image from '@bbb-app/core-ui/image';
import Heading from '@bbb-app/core-ui/heading';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ErrorBoundary from '@bbb-app/core-ui/error-boundary';
import getRectifiedURLFromScene7URL from '@bbb-app/utils/getRectifiedURLFromScene7URL';
import RegistryStory from '../RegistryStory/RegistryStory';
import RegistryOwner from '../../../../../containers/Pages/Registry/RegistryOwner/RegistryOwner';
import StatusBar from './StatusBar';
import styles from './RegistryOverView.css';
import RegistryCategory from '../RegistryCategory/RegistryCategory';
import RegistryMarketingBanner from '../RegistryMarketingBanner/MarketingBanner';
import RegistryBrands from '../RegistryBrands/RegistryBrands';

class RegistryOverView extends React.PureComponent {
  getDashboardData() {
    const { contentStackSelectors } = this.props;
    const dashboardCSData = [];
    const contentData =
      contentStackSelectors &&
      contentStackSelectors[0] &&
      contentStackSelectors[0].modules;
    const builder = [];
    if (contentData) {
      contentData.map(regModule => {
        if (regModule.registry_story) {
          dashboardCSData.push({ registryStory: regModule.registry_story });
        } else if (regModule.status_bar) {
          dashboardCSData.push({ statusBar: regModule.status_bar });
        } else if (regModule?.story_title?.background_color === 'REG_BUILDER') {
          builder.push(regModule.story_title);
        } else if (regModule.registry_builder) {
          const tempArray = { ...builder, ...regModule.registry_builder };
          dashboardCSData.push({ registryBuilder: tempArray });
        } else if (
          regModule?.category_module?.background_color === 'CATEGORY'
        ) {
          dashboardCSData.push({ categories: regModule.category_module });
        } else if (regModule?.product_carousel) {
          dashboardCSData.push({ expertPicks: regModule.product_carousel });
        } else if (
          regModule?.story_hero?.background_color === 'MARKETING_BANNER'
        ) {
          dashboardCSData.push({ marketingBanner: regModule.story_hero });
        } else if (
          regModule?.story_hero?.background_color === 'MY_ITEMS_ZERO_STATE'
        ) {
          dashboardCSData.push({ zeroState: regModule.story_hero });
        } else if (regModule?.category_module?.background_color === 'BRANDS') {
          dashboardCSData.push({ brands: regModule.category_module });
        }
        return dashboardCSData;
      });
    }
    return dashboardCSData;
  }
  getImageSrc = data => {
    let innerWidth = 0;
    if (isBrowser()) {
      innerWidth = window.innerWidth;
    }
    const isDsk = innerWidth >= 1024;
    const isTablet = innerWidth >= 768 && innerWidth < 1024;
    if (isDsk) {
      return getRectifiedURLFromScene7URL(
        data && data.image.image_scene7_id_dsk_
      );
    } else if (isTablet) {
      return getRectifiedURLFromScene7URL(
        data && data.image.image_scene7_id_tab_
      );
    }
    return getRectifiedURLFromScene7URL(
      data && data.image.image_scene7_id_mob_
    );
  };
  renderStoryTiles(registryStory) {
    return <RegistryStory storyData={registryStory?.item} {...this.props} />;
  }
  renderStatusBar(statusBar) {
    return <StatusBar {...this.props} statusBar={statusBar} />;
  }
  renderRegistryBuilder = (registryBuilder, categoryList) => {
    const { setShowRegBuilder } = this.props;
    return (
      <div className="sm-px2">
        <Heading level={2} className={styles.rbHeading}>
          {registryBuilder[0].headline}
        </Heading>
        <p className={styles.rbSubHeading}>{registryBuilder[0].description}</p>
        <PrimaryLink
          className={styles.inlineFlex}
          type="bold"
          variation="primary"
          href="#"
          onClick={() => setShowRegBuilder('default')}
        >
          {'click here.'}
        </PrimaryLink>
        <div className="flex mt3">
          {registryBuilder.item.map((item, index) => {
            const categoryArr = categoryList.filter((e, i) => i === index);
            return (
              <div className="mr25">
                <button
                  className={styles.rbItem}
                  onClick={() =>
                    setShowRegBuilder(
                      (categoryArr &&
                        categoryArr[0] &&
                        categoryArr[0].displayName) ||
                        item.cta.title
                    )
                  }
                >
                  <Image
                    className={styles.bRadius}
                    src={item.scene7_image_id}
                  />
                </button>
                <p className="center">
                  {(categoryArr &&
                    categoryArr[0] &&
                    categoryArr[0].displayName) ||
                    item.cta.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  renderRegistryOwner(showExpertPicks, moduleData) {
    const { updateFilterItemCount, changeFilter, saveStoreInfo } = this.props;
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <RegistryOwner
            updateFilterItemCount={updateFilterItemCount}
            changeFilter={changeFilter}
            saveStoreInfo={saveStoreInfo}
            showExpertPicks={showExpertPicks}
            moduleData={moduleData}
            getImageSrc={!showExpertPicks && this.getImageSrc(moduleData)}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }
  renderCategories(categories) {
    return (
      <RegistryCategory categoryData={categories} propsData={this.props} />
    );
  }
  renderMarketingBanner(marketingBanner) {
    return (
      <RegistryMarketingBanner
        data={marketingBanner}
        getImageSrc={this.getImageSrc(marketingBanner)}
      />
    );
  }
  renderBrands(brands) {
    return <RegistryBrands brandsData={brands} propsData={this.props} />;
  }

  renderExpertPicks(data) {
    return (
      <React.Fragment>{this.renderRegistryOwner(true, data)}</React.Fragment>
    );
  }
  renderOverViewLayout(dashboardCSData) {
    const { interactiveCheckListData } = this.props;
    const categoryList =
      (interactiveCheckListData && interactiveCheckListData.categoryListVO) ||
      [];
    return dashboardCSData.map(dataModule => {
      if (dataModule.registryStory)
        return this.renderStoryTiles(dataModule.registryStory);
      if (dataModule.statusBar)
        return this.renderStatusBar(dataModule.statusBar);
      if (!isEmpty(dataModule.registryBuilder))
        return this.renderRegistryBuilder(
          dataModule.registryBuilder,
          categoryList
        );
      if (dataModule.categories)
        return this.renderCategories(dataModule.categories);
      if (dataModule.expertPicks)
        return this.renderExpertPicks(dataModule.expertPicks);
      if (dataModule.marketingBanner)
        return this.renderMarketingBanner(dataModule.marketingBanner);
      if (dataModule.zeroState)
        return this.renderRegistryOwner(false, dataModule.zeroState);
      if (dataModule.brands) return this.renderBrands(dataModule.brands);
      return null;
    });
  }
  render() {
    const dashboardCSData = this.getDashboardData();
    if (isEmpty(dashboardCSData)) return null;
    return (
      <React.Fragment>
        {this.renderOverViewLayout(dashboardCSData)}
      </React.Fragment>
    );
  }
}

RegistryOverView.propTypes = {
  saveStoreInfo: PropTypes.func,
  contentStackSelectors: PropTypes.object,
  updateFilterItemCount: PropTypes.func,
  changeFilter: PropTypes.func,
  setShowRegBuilder: PropTypes.func,
  interactiveCheckListData: PropTypes.object,
};

export default RegistryOverView;
