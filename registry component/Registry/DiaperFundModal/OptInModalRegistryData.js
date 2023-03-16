export const registryState = registryDetailsData => {
  const shippingAddressOne = registryDetailsData.shippingAddress.addressLine1;
  const moveInAddressOne = registryDetailsData.futureshippingAddress;
  return {
    shippingCity: registryDetailsData.shippingAddress.city,
    primaryPh: registryDetailsData.primaryRegistrantPrimaryPhoneNum,
    shippingState: registryDetailsData.shippingAddress.state,
    shippingZip: registryDetailsData.shippingAddress.zip,
    addressOne: registryDetailsData.shippingAddress.addressLine1,
    apartment: registryDetailsData.shippingAddress.addressLine2,
    isPublic: registryDetailsData.isPublic,
    babyGender: registryDetailsData.eventVO.babyGender,
    babyMaidenName: registryDetailsData.primaryRegistrantMaidenName,
    babyNurseryTheme: registryDetailsData.eventVO.babyNurseryTheme,
    city: registryDetailsData.shippingAddress.city,
    coEmail: '',
    coFirstName: registryDetailsData.coRegistrantFirstName,
    coGender: registryDetailsData.coRegBG,
    coLastName: registryDetailsData.coRegistrantLastName,
    coRegOwner: registryDetailsData.coRegOwner,

    college: registryDetailsData.eventVO.college,
    mobilePh: registryDetailsData.primaryRegistrantMobileNum,
    firstName: registryDetailsData.primaryRegistrantFirstName,
    lastName: registryDetailsData.primaryRegistrantLastName,

    prefStoreNum: registryDetailsData.prefStoreNum,

    state: registryDetailsData.shippingAddress.state,
    zip: registryDetailsData.shippingAddress.zip,
    qasContactValidated: false,
    shippingAddressOne,
    shippingApartment: registryDetailsData.shippingAddress.addressLine2,

    shippingCountry: registryDetailsData.shippingAddress.shippingCountry,

    qasShippingValidated: false,

    moveInAddressOne,
    moveInApartment: registryDetailsData.shippingAddress.addressLine2,
    moveInCity: registryDetailsData.shippingAddress.city,

    moveInState: registryDetailsData.shippingAddress.state,
    moveInCountry: registryDetailsData.shippingAddress.country,
    qasMovingValidated: registryDetailsData.shippingAddress.qasValidated,
    moveInZip: registryDetailsData.shippingAddress.zip,
    futureShippingDate: registryDetailsData.futureShippingDate,
    email: registryDetailsData.primaryRegistrantEmail,
    thirdPartySelected: registryDetailsData.networkAffiliation,
    guests: registryDetailsData.eventVO.guestCount,
    eventDate: registryDetailsData.eventDate,
    showerDate: registryDetailsData.eventVO.showerDate,
    gender: registryDetailsData.babyGender,
    isContactAddressChanged: false,
    isMovingSoonChanged: true,
    coRegProfileStatus: 'false',
    iscoRegEmailFlag: false,
    shippingStreet: shippingAddressOne && shippingAddressOne.length !== 0,
    showShippingInfo: true,
    showMoveInInfo: moveInAddressOne && moveInAddressOne.length !== 0,
  };
};
