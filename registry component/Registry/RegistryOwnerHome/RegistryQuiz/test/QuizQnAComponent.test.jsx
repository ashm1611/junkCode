/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Sinon from 'sinon';
import Notification from '@bbb-app/core-ui/notification/Notification';
import Loader from '@bbb-app/core-ui/section-loader';
import QuizQnAComponent from '../QuizQnAComponent';

configure({ adapter: new Adapter() });

describe(__filename, () => {
  const contentStackData = [
    {
      modules: [
        {
          story_tiles: {
            view_type: {},
            class_name: [],
            background_color:
              'When I think about baby products, the most important factor to me is…',
            story_tiles: [
              {
                title: 'Budget',
                description: '',
                field_class_names: [],
                background_colors: 'A',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                  image_alt_text: 'Budget',
                },
              },
              {
                title: 'Durability',
                description: '',
                field_class_names: [],
                background_colors: 'B',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/will-it-last-the-long-haul-copy?$content$',
                  image_alt_text: 'Durability',
                },
              },
              {
                title: 'Sustainability / Organic',
                description: '',
                field_class_names: [],
                background_colors: 'C',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/going-green-for-mama-earth-copy?$content$',
                  image_alt_text: 'Sustainability / Organic',
                },
              },
              {
                title: 'New / Noteworthy Brand',
                description: '',
                field_class_names: [],
                background_colors: 'D',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/the-latest-greatest-brands-copy?$content$',
                  image_alt_text: 'New / Noteworthy Brand',
                },
              },
            ],
          },
        },
        {
          story_tiles: {
            view_type: {},
            class_name: [],
            background_color: "What I'm most excited about with my baby…",
            story_tiles: [
              {
                title: 'Reading to my baby',
                description: '',
                field_class_names: [],
                background_colors: 'A',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/a-storytime-snu-ggle-sesh-copy?$content$',
                  image_alt_text: 'Reading to my baby',
                },
              },
              {
                title: 'Going for a family hike',
                description: '',
                field_class_names: [],
                background_colors: 'B',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/family-hikes-ftw-copy?$content$',
                  image_alt_text: 'Going for a family hike',
                },
              },
              {
                title: 'Making baby food',
                description: '',
                field_class_names: [],
                background_colors: 'C',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/making-my-own-baby-food-copy?$content$',
                  image_alt_text: 'Making baby food',
                },
              },
              {
                title: 'All the adorable outfits!',
                description: '',
                field_class_names: [],
                background_colors: 'D',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/all-the-adorable-outfits-copy?$content$',
                  image_alt_text: 'All the adorable outfits!',
                },
              },
            ],
          },
        },
        {
          story_tiles: {
            view_type: {},
            class_name: [],
            background_color: "I'm most overwhelmed by…",
            story_tiles: [
              {
                title: 'Saving for the future',
                description: '',
                field_class_names: [],
                background_colors: 'A',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/creating-an-insta-worthy-nursery-copy?$content$',
                  image_alt_text: 'Saving for the future',
                },
              },
              {
                title: 'Finding the right gear',
                description: '',
                field_class_names: [],
                background_colors: 'B',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/finding-gear-that-keeps-up-copy?$content$',
                  image_alt_text: 'Finding the right gear',
                },
              },
              {
                title: 'Breastfeeding',
                description: '',
                field_class_names: [],
                background_colors: 'C',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/saving-for-college-gulp-copy?$content$',
                  image_alt_text: 'Breastfeeding',
                },
              },
              {
                title: 'Creating the perfect nursery',
                description: '',
                field_class_names: [],
                background_colors: 'D',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/the-best-breastfeeding-setup-copy?$content$',
                  image_alt_text: 'Creating the perfect nursery',
                },
              },
            ],
          },
        },
        {
          story_tiles: {
            view_type: {},
            class_name: [],
            background_color: 'My style is best described by…',
            story_tiles: [
              {
                title: 'Simpler the better, no fuss',
                description: '',
                field_class_names: [],
                background_colors: 'A',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/no-fuss-the-simpler-the-better-copy?$content$',
                  image_alt_text: 'Simpler the better, no fuss',
                },
              },
              {
                title: 'Athletic',
                description: '',
                field_class_names: [],
                background_colors: 'B',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/sporty-copy?$content$',
                  image_alt_text: 'Athletic',
                },
              },
              {
                title: 'Au Naturale ',
                description: '',
                field_class_names: [],
                background_colors: 'C',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/natural-or-boho-copy?$content$',
                  image_alt_text: 'Au Naturale ',
                },
              },
              {
                title: 'On point, always stylish',
                description: '',
                field_class_names: [],
                background_colors: 'D',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/always-on-trend-copy?$content$',
                  image_alt_text: 'On point, always stylish',
                },
              },
            ],
          },
        },
        {
          story_tiles: {
            view_type: {},
            class_name: [],
            background_color: 'My ideal afternoon is…',
            story_tiles: [
              {
                title: 'Organizing My House',
                description: '',
                field_class_names: [],
                background_colors: 'A',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/getting-my-sweat-on-copy?$content$',
                  image_alt_text: 'Organizing My House',
                },
              },
              {
                title: 'Going for a Long Run',
                description: '',
                field_class_names: [],
                background_colors: 'B',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/organizing-everything-in-its-place-copy?$content$',
                  image_alt_text: 'Going for a Long Run',
                },
              },
              {
                title: 'Outdoor Yoga Class',
                description: '',
                field_class_names: [],
                background_colors: 'C',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/practicing-my-downward-do-copy?$content$',
                  image_alt_text: 'Outdoor Yoga Class',
                },
              },
              {
                title: 'Shopping, Always Shopping',
                description: '',
                field_class_names: [],
                background_colors: 'D',
                image_scene7: {
                  field_image:
                    '//b3h2.scene7.com/is/image/BedBathandBeyond/shopping-always-shopping-copy?$content$',
                  image_alt_text: 'Shopping, Always Shopping',
                },
              },
            ],
          },
        },
      ],
      title: 'Registry Quiz success modal',
    },
  ];
  const activeRegistry = {
    registryId: '123',
    eventType: 'baby',
  };

  it('should render quiz modal component', () => {
    const wrapper = shallow(
      <QuizQnAComponent contentStackData={contentStackData} />
    );
    expect(toJson(wrapper)).to.matchSnapshot();
  });

  it('should render quiz modal component for else part', () => {
    contentStackData[0].modules[0].story_tiles.background_color = null;
    const wrapper = shallow(
      <QuizQnAComponent contentStackData={contentStackData} />
    );
    wrapper.setState({ selectedQnAIndex: 1 });
    expect(toJson(wrapper)).to.matchSnapshot();
  });
  it('should go to previous question when back clicked', () => {
    contentStackData[0].modules[0].story_tiles.background_color = null;
    const wrapper = shallow(
      <QuizQnAComponent contentStackData={contentStackData} />
    );
    wrapper.setState({ selectedQnAIndex: 1 });
    wrapper.instance().setBackClick();
    expect(wrapper.instance().state.selectedQnAIndex).to.be.equal(0);
  });
  it('should set answer index when clicked on tiles', () => {
    const fetchQuizPersona = Sinon.spy();
    const clearQuizModal = Sinon.spy();
    const newContentStack = [
      {
        modules: [
          {
            story_tiles: {
              background_color: 'abc',
              story_tiles: [
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
              ],
            },
          },
          {
            story_tiles: {
              background_color: 'xyz',
              story_tiles: [
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                  eyebrow_title: 'XYZ',
                },
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
              ],
            },
          },
          {
            story_tiles: {
              background_color: 'content',
              story_tiles: [
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
              ],
            },
          },
          {
            story_tiles: {
              background_color: 'bar',
              story_tiles: [
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
              ],
            },
          },
          {
            story_tiles: {
              background_color: 'foo',
              story_tiles: [
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
              ],
            },
          },
        ],
      },
    ];
    const wrapper = shallow(
      <QuizQnAComponent
        contentStackData={newContentStack}
        fetchQuizPersona={fetchQuizPersona}
        clearQuizModal={clearQuizModal}
      />
    );
    wrapper.setState({
      selectedQnAIndex: 1,
      allAnswerSet: [],
    });
    wrapper
      .find('.OptionContainer')
      .at(0)
      .simulate('click');
    expect(wrapper.instance().state.allAnswerSet).to.deep.equal([
      { answerIndex: 0, questionIndex: 1, answerValue: '', persona: 'XYZ' },
    ]);
  });
  it('should update answer index when clicked another answer tiles', () => {
    const newContentStack = [
      {
        modules: [
          {
            story_tiles: {
              background_color: 'abc',
              story_tiles: [
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
              ],
            },
          },
          {
            story_tiles: {
              background_color: 'xyz',
              story_tiles: [
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                  eyebrow_title: 'YZZ',
                },
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
              ],
            },
          },
          {
            story_tiles: {
              background_color: 'pqa',
              story_tiles: [
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
              ],
            },
          },
          {
            story_tiles: {
              background_color: 'lok',
              story_tiles: [
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
              ],
            },
          },
          {
            story_tiles: {
              background_color: 'hty',
              story_tiles: [
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
                {
                  background_colors: '',
                  image_scene7: {
                    field_image:
                      '//b3h2.scene7.com/is/image/BedBathandBeyond/scoring-the-best-deal-copy?$content$',
                    image_alt_text: 'Budget',
                  },
                },
              ],
            },
          },
        ],
      },
    ];
    const wrapper = shallow(
      <QuizQnAComponent contentStackData={newContentStack} />
    );
    wrapper.setState({
      selectedQnAIndex: 1,
      allAnswerSet: [
        { answerIndex: 1, questionIndex: 1, answerValue: '', persona: 'YZZ' },
      ],
    });
    wrapper
      .find('.OptionContainer')
      .at(0)
      .simulate('click');
    expect(wrapper.instance().state.allAnswerSet).to.deep.equal([
      { answerIndex: 0, questionIndex: 1, answerValue: '', persona: 'YZZ' },
    ]);
  });
  it('should show error notification if API call failed', () => {
    const wrapper = shallow(
      <QuizQnAComponent
        contentStackData={contentStackData}
        getQuizErrorMessage="error"
      />
    );
    wrapper.setState({
      selectedQnAIndex: 1,
      allAnswerSet: [{ answerIndex: 1, questionIndex: 1, answerValue: '' }],
    });
    expect(wrapper.find(Notification)).to.have.lengthOf(1);
  });

  it('Content stack is empty', () => {
    const wrapper = shallow(<QuizQnAComponent contentStackData={''} />);
    expect(wrapper.find(Loader)).to.have.lengthOf(1);
  });

  it('should return empty when contentstack data not fetched', () => {
    const wrapper = shallow(
      <QuizQnAComponent contentStackData={{}} getQuizErrorMessage />
    );
    expect(wrapper).to.be.empty;
  });

  it('should call submitQuizData with quizCompletedCallback', () => {
    const quizCompletedCallBack = Sinon.spy();
    const fireTealiumAction = Sinon.spy();
    const wrapper = shallow(
      <QuizQnAComponent
        contentStackData={contentStackData}
        quizCompletedCallBack={quizCompletedCallBack}
        registryId={'123'}
        customerId={'123'}
        activeRegistry={activeRegistry}
        fireTealiumAction={fireTealiumAction}
      />
    );
    wrapper.setState({
      selectedQnAIndex: 4,
      allAnswerSet: [{ answerIndex: 4, questionIndex: 4, answerValue: 'A' }],
    });
    wrapper
      .find('.OptionContainer')
      .at(0)
      .simulate('click');
    expect(quizCompletedCallBack).to.be.called;
  });
});
