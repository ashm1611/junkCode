export const registryState = registryDetailsData => {
  const shippingAddressOne =
    registryDetailsData.registryResVO.registryVO.shipping.shippingAddress
      .addressLine1;
  const moveInAddressOne =
    registryDetailsData.registryResVO.registryVO.shipping.futureshippingAddress
      .addressLine1;
  return {
    shippingCity:
      registryDetailsData.registryResVO.registryVO.shipping.shippingAddress
        .city,
    primaryPh:
      registryDetailsData.registryResVO.registryVO.primaryRegistrant
        .primaryPhone,
    shippingState:
      registryDetailsData.registryResVO.registryVO.shipping.shippingAddress
        .state,
    shippingZip:
      registryDetailsData.registryResVO.registryVO.shipping.shippingAddress.zip,
    addressOne:
      registryDetailsData.registryResVO.registryVO.primaryRegistrant
        .contactAddress.addressLine1,
    apartment:
      registryDetailsData.registryResVO.registryVO.primaryRegistrant
        .contactAddress.addressLine2,
    isPublic: registryDetailsData.registryResVO.registryVO.isPublic,
    babyGender: registryDetailsData.registryResVO.registryVO.event.babyGender,
    babyMaidenName:
      registryDetailsData.registryResVO.registryVO.primaryRegistrant
        .babyMaidenName,
    babyNurseryTheme:
      registryDetailsData.registryResVO.registryVO.event.babyNurseryTheme,
    city:
      registryDetailsData.registryResVO.registryVO.primaryRegistrant
        .contactAddress.city,
    coEmail:
      registryDetailsData.registryResVO.registryVO.coRegistrant.email || '',
    coFirstName:
      registryDetailsData.registryResVO.registryVO.coRegistrant.firstName,
    coGender: registryDetailsData.registryResVO.registryVO.coRegBG,
    coLastName:
      registryDetailsData.registryResVO.registryVO.coRegistrant.lastName,
    coRegOwner: registryDetailsData.registryResVO.registryVO.coRegOwner,

    college: registryDetailsData.registryResVO.registryVO.event.college,
    mobilePh:
      registryDetailsData.registryResVO.registryVO.primaryRegistrant.cellPhone,
    firstName:
      registryDetailsData.registryResVO.registryVO.primaryRegistrant.firstName,
    lastName:
      registryDetailsData.registryResVO.registryVO.primaryRegistrant.lastName,

    prefStoreNum: registryDetailsData.registryResVO.registryVO.prefStoreNum,

    state:
      registryDetailsData.registryResVO.registryVO.primaryRegistrant
        .contactAddress.state,
    zip:
      registryDetailsData.registryResVO.registryVO.primaryRegistrant
        .contactAddress.zip,
    qasContactValidated: false,
    shippingAddressOne,
    shippingApartment:
      registryDetailsData.registryResVO.registryVO.shipping.shippingAddress
        .addressLine2,

    shippingCountry:
      registryDetailsData.registryResVO.registryVO.shipping.shippingAddress
        .shippingCountry,

    qasShippingValidated: false,

    moveInAddressOne,
    moveInApartment:
      registryDetailsData.registryResVO.registryVO.shipping
        .futureshippingAddress.addressLine2,
    moveInCity:
      registryDetailsData.registryResVO.registryVO.shipping
        .futureshippingAddress.city,

    moveInState:
      registryDetailsData.registryResVO.registryVO.shipping
        .futureshippingAddress.state,
    moveInCountry:
      registryDetailsData.registryResVO.registryVO.shipping
        .futureshippingAddress.country,
    qasMovingValidated:
      registryDetailsData.registryResVO.registryVO.shipping
        .futureshippingAddress.qasValidated,
    moveInZip:
      registryDetailsData.registryResVO.registryVO.shipping
        .futureshippingAddress.zip,
    futureShippingDate:
      registryDetailsData.registryResVO.registrySummaryVO.futureShippingDate,
    email: registryDetailsData.registryResVO.registryVO.primaryRegistrant.email,
    thirdPartySelected:
      registryDetailsData.registryResVO.registryVO.networkAffiliation,
    guests: registryDetailsData.registryResVO.registryVO.event.guestCount,
    eventDate: registryDetailsData.registryResVO.registrySummaryVO.eventDate,
    showerDate: registryDetailsData.registryResVO.registryVO.event.showerDate,
    gender: registryDetailsData.registryResVO.registryVO.regBG,
    isContactAddressChanged: false,
    isMovingSoonChanged: true,
    coRegProfileStatus: 'false',
    iscoRegEmailFlag: false,
    shippingStreet: shippingAddressOne && shippingAddressOne.length !== 0,
    showShippingInfo: true,
    showMoveInInfo: moveInAddressOne && moveInAddressOne.length !== 0,
    showChecklist:
      registryDetailsData.registryResVO.registrySummaryVO.showChecklist,
  };
};
