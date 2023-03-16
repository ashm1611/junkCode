import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { isEmpty } from 'lodash';
import Accordion from '@bbb-app/core-ui/accordion/Accordion';
import Icon from '@bbb-app/core-ui/icon/Icon';
import Heading from '@bbb-app/core-ui/heading';
import Image from '@bbb-app/core-ui/image';
import PrimaryLink from '@bbb-app/core-ui/primary-link';
import ModalDialog from '@bbb-app/modal-dialog/components/ModalDialog';
import styles from './RegistryBuilderPage.css';

class RegistryBuilderPage extends React.PureComponent {
  getSubLabel = catArray => {
    if (this.checkForCompleted(catArray))
      return { title: 'Completed', style: 'greenLabel' };
    else if (this.checkForInProgress(catArray))
      return { title: 'In Progress', style: 'greenLabel' };
    return { title: 'Get Started', style: 'blueLabel' };
  };

  checkForInProgress = categoryArray =>
    categoryArray.childCategoryVO.some(subCategory =>
      subCategory.childCategoryVO.some(item => item.addedQuantity > 0)
    );
  checkForCompleted = categoryArray =>
    categoryArray.childCategoryVO.every(subCategory =>
      subCategory.childCategoryVO.every(
        item => item.addedQuantity >= item.suggestedQuantity
      )
    );

  RegistryBuilderPage = categoryListVO => {
    const { showRegBuilder } = this.props;
    return (
      <div className={styles.rbWrapper}>
        <Heading level={1} className={styles.rbHeading}>
          {'registry builder'}
        </Heading>
        <p className={styles.rbSubHeading}>
          {
            'Get $150 in rewards when $1,500 products are purchased from your registry'
          }
        </p>
        <div className={styles.accordionWrapper}>
          {categoryListVO.map(categoryParent => {
            const subLabel = this.getSubLabel(categoryParent);
            return (
              <Accordion
                accordion={false}
                noBorder
                showExpanded={false}
                className={styles.rbAccordion}
                showExpandCollapseIcon={false}
                expandCollapseIconClass={styles.expandCollapseIconClass}
                expandCollapseIconPos="right"
                expandCollapseIcons={{
                  expand: (
                    <span>
                      <Icon type="caret" width="18px" height="18px" />
                    </span>
                  ),
                  collapse: (
                    <span className={styles.collapseSVGIcon}>
                      <Icon type="caret" width="18px" height="18px" />
                    </span>
                  ),
                }}
                data={[
                  {
                    title: (
                      <div
                        className={classnames('grid-x', styles.contentWrapper)}
                      >
                        <Image
                          className={styles.categoryParentImg}
                          src={categoryParent.imageURL}
                        />
                        <div
                          className={classnames('grid-y', styles.parentTitle)}
                        >
                          <Heading level={4} className={styles.parentTitleHead}>
                            {categoryParent.displayName}
                          </Heading>
                          <p className={styles[subLabel.style]}>
                            {subLabel.title}
                          </p>
                        </div>
                      </div>
                    ),
                    body: (
                      <div
                        className={classnames(
                          styles.borderTop,
                          styles.contentWrapper
                        )}
                      >
                        {categoryParent.childCategoryVO.map(childCategory => (
                          <Accordion
                            accordion={false}
                            noBorder
                            className={styles.childAccordion}
                            showExpanded={false}
                            showExpandCollapseIcon={false}
                            expandCollapseIconClass={
                              styles.expandCollapseIconClassChild
                            }
                            expandCollapseIconPos="right"
                            expandCollapseIcons={{
                              expand: (
                                <span className={styles.expandChildSVGIcon}>
                                  <Icon
                                    type="caret"
                                    width="18px"
                                    height="18px"
                                  />
                                </span>
                              ),
                              collapse: (
                                <span>
                                  <Icon
                                    type="caret"
                                    width="18px"
                                    height="18px"
                                  />
                                </span>
                              ),
                            }}
                            data={[
                              {
                                title: (
                                  <div
                                    className={classnames(
                                      'grid-x',
                                      styles.contentChildWrapper
                                    )}
                                  >
                                    <Image
                                      className={styles.categoryChildImg}
                                      src={childCategory.imageURL}
                                    />
                                    <div className={styles.childTitle}>
                                      <Heading
                                        level={4}
                                        className={styles.childTitleHead}
                                      >
                                        {childCategory.displayName}
                                      </Heading>
                                    </div>
                                  </div>
                                ),
                                body: (
                                  <div className={styles.contentWrapperItem}>
                                    {childCategory.childCategoryVO.map(item => (
                                      <div className={styles.categoryItem}>
                                        <span>
                                          <PrimaryLink href={item.categoryURL}>
                                            {item.categoryName}
                                          </PrimaryLink>
                                        </span>
                                        <span className={styles.right}>
                                          {item.addedQuantity >=
                                            item.suggestedQuantity && (
                                            <span className={styles.tickMark}>
                                              ✓
                                            </span>
                                          )}
                                          {`${item.addedQuantity} of ${item.suggestedQuantity}`}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                ),
                                expanded: false,
                              },
                            ]}
                          />
                        ))}
                      </div>
                    ),
                    expanded: showRegBuilder === categoryParent.displayName,
                  },
                ]}
              />
            );
          })}
        </div>
      </div>
    );
  };
  render() {
    const {
      isMobile,
      setShowRegBuilder,
      interactiveCheckListData,
    } = this.props;
    if (isEmpty(interactiveCheckListData)) return null;
    const categoryListVO = Array.isArray(
      interactiveCheckListData.categoryListVO
    )
      ? interactiveCheckListData.categoryListVO
      : [];
    if (isEmpty(categoryListVO)) return null;
    return isMobile ? (
      <ModalDialog
        mountedState
        titleText={'MODALDIALOG_LBL'}
        toggleModalState={() => setShowRegBuilder(null)}
      >
        {this.RegistryBuilderPage(categoryListVO)}
      </ModalDialog>
    ) : (
      <div className={'grid-container'}>
        {this.RegistryBuilderPage(categoryListVO)}
      </div>
    );
  }
}

RegistryBuilderPage.propTypes = {
  isMobile: PropTypes.bool,
  showRegBuilder: PropTypes.string,
  setShowRegBuilder: PropTypes.func,
  interactiveCheckListData: PropTypes.object,
};

export default RegistryBuilderPage;
