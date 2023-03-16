import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import sinon from 'sinon';

import CoRegistrantModal from '../CoregistrantModal';

configure({ adapter: new Adapter() });

const labels = {
  regModalHeader: 'Fantastic! What’s the occasion?',
  popularlabel: 'POPULAR REGISTRIES',
  otherTypeLabel: 'OTHER TYPES',
  createRegistry: {
    referredContent: [
      {
        id: '9882',
        key: 'coRegistrantProfileExist',
      },
      {
        id: '9883',
        key: 'coRegistrantExtendedProfile',
      },
      {
        id: '9884',
        key: 'coRegistrantProfileNotFound',
      },
      {
        id: '9885',
        key: 'RegistrantProfileExtend',
      },
    ],
  },
};

const labelsCS = {
  referredContent: [
    {
      id: '9882',
      key: 'coRegistrantProfileExist',
    },
    {
      id: '9883',
      key: 'coRegistrantExtendedProfile',
    },
    {
      id: '9884',
      key: 'coRegistrantProfileNotFound',
    },
    {
      id: '9885',
      key: 'RegistrantProfileExtend',
    },
  ],
};
const globalSwitchConfig = { enableCSLabels: true };
const profileStatus = 'true';
const coRegistrantEmail = 'abc';
const toggleCoregistrantModalState = sinon.spy();
const closeCoregistrantModal = sinon.spy();
const referredContentObj = {
  content: {
    9882: {
      body: 'Hello',
    },
    9279: {
      body: 'hi',
    },
    9280: {
      body: 'hi',
    },
    9883: {
      body: 'hi',
    },
    9885: {
      body: 'hi',
    },
  },
};
describe(__filename, () => {
  it('should render correctly when profile not found', () => {
    const tree = shallow(
      <CoRegistrantModal
        profileStatus={profileStatus}
        labels={labelsCS}
        isCoregistrantModalOpen
        coRegistrantEmail={coRegistrantEmail}
        toggleCoregistrantModalState={toggleCoregistrantModalState}
        closeCoregistrantModal={closeCoregistrantModal}
        referredContent={referredContentObj}
        globalSwitchConfig={globalSwitchConfig}
      />
    );

    expect(toJson(tree)).to.matchSnapshot();
  });
  it('should render correctly when profile already exists', () => {
    const status = 'true';
    const tree = shallow(
      <CoRegistrantModal
        profileStatus={status}
        labels={labels}
        isCoregistrantModalOpen
        coRegistrantEmail={coRegistrantEmail}
        toggleCoregistrantModalState={toggleCoregistrantModalState}
        closeCoregistrantModal={closeCoregistrantModal}
        referredContent={referredContentObj}
      />
    );
    expect(tree.find('ReferredContentModal')).to.have.lengthOf(1);
  });
  it('should render correctly when profile exists in non sister sites', () => {
    const status = 'nonSister';
    const tree = shallow(
      <CoRegistrantModal
        profileStatus={status}
        labels={labels}
        isCoregistrantModalOpen
        coRegistrantEmail={coRegistrantEmail}
        toggleCoregistrantModalState={toggleCoregistrantModalState}
        closeCoregistrantModal={closeCoregistrantModal}
        referredContent={referredContentObj}
      />
    );

    expect(tree.find('ReferredContentModal')).to.have.lengthOf(1);
  });
  it('should render correctly when profile exists in coRegistrantProfileNotFound sites', () => {
    const status = 'coRegistrantProfileNotFound';
    const tree = shallow(
      <CoRegistrantModal
        profileStatus={status}
        labels={labels}
        isCoregistrantModalOpen
        coRegistrantEmail={coRegistrantEmail}
        toggleCoregistrantModalState={toggleCoregistrantModalState}
        closeCoregistrantModal={closeCoregistrantModal}
        referredContent={referredContentObj}
      />
    );
    expect(tree.find('ReferredContentModal')).to.have.lengthOf(1);
  });
  it('should render correctly if referred content is null', () => {
    const tree = shallow(
      <CoRegistrantModal
        profileStatus={status}
        labels={labels}
        isCoregistrantModalOpen
        coRegistrantEmail={coRegistrantEmail}
        toggleCoregistrantModalState={toggleCoregistrantModalState}
        closeCoregistrantModal={closeCoregistrantModal}
        referredContent={null}
      />
    );

    expect(tree.find('PrimaryLink')).to.have.lengthOf(1);
  });
  it('should render correctly when referredContent return body array', () => {
    const referredContentObj1 = {
      content: {
        9883: {
          body: [],
        },
        9885: {
          body: 'hi',
        },
      },
    };
    const status = 'nonSister';
    const tree = shallow(
      <CoRegistrantModal
        profileStatus={status}
        labels={labels}
        isCoregistrantModalOpen
        coRegistrantEmail={coRegistrantEmail}
        toggleCoregistrantModalState={toggleCoregistrantModalState}
        closeCoregistrantModal={closeCoregistrantModal}
        referredContent={referredContentObj1}
      />
    );

    expect(tree.find('ReferredContentModal')).to.have.lengthOf(1);
  });
  it('should render correctly when without labels', () => {
    const status = 'nonSister';
    const tree = shallow(
      <CoRegistrantModal
        profileStatus={status}
        labels={{}}
        isCoregistrantModalOpen
        coRegistrantEmail={coRegistrantEmail}
        toggleCoregistrantModalState={toggleCoregistrantModalState}
        closeCoregistrantModal={closeCoregistrantModal}
        referredContent={referredContentObj}
      />
    );

    expect(tree.find('ReferredContentModal')).to.have.lengthOf(1);
  });
});
