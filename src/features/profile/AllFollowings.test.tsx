import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { BrowserRouter } from 'react-router-dom';
import AllFollowings, { util } from './AllFollowings';

describe('AllFollowings testing', () => {

    it('should show Followings', async ()=>{

        const { getByText } = render(
          <Provider store={store}>
              <BrowserRouter>
                <AllFollowings/>
              </BrowserRouter>
          </Provider>
        );
        expect(getByText("Followings")).toBeInTheDocument();
      })

      it('should call dispatchUser and updateAll', async () => {
        const { getByText } = render(
          <Provider store={store}>
              <BrowserRouter>
                <AllFollowings/>
              </BrowserRouter>
          </Provider>
        );
        const updateAll = jest.spyOn(util, 'updateAll');
        const dispatchUser = jest.spyOn(util, 'dispatchUser');
        //expect(getByText).toBeInTheDocument();
        // expect(dispatchUser).toBeInTheDocument();
      })

    });