/*
 * Copyright 2023 Cortex Applications, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { render } from '@testing-library/react';
import { TestApiProvider, wrapInTestApp } from '@backstage/test-utils';
import { CortexApi } from '../../../api/CortexApi';
import { cortexApiRef } from '../../../api';
import { HeatmapPage } from './HeatmapPage';
import { rootRouteRef } from '../../../routes';

describe('HeatmapPage', () => {
  const cortexApi: Partial<CortexApi> = {
    getScorecards: () =>
      Promise.resolve([
        {
          creator: { name: 'Billy Bob', email: 'billybob@cortex.io' },
          id: 1,
          name: 'My Scorecard',
          description: 'Some description',
          rules: [],
          tags: [],
          excludedTags: [],
          filterQuery: undefined,
          nextUpdated: '2021-08-25T04:00:00',
        },
      ]),
  };

  const renderWrapped = (children: React.ReactNode) =>
    render(
      wrapInTestApp(
        <TestApiProvider apis={[[cortexApiRef, cortexApi]]}>
          {children}
        </TestApiProvider>,
        {
          mountedRoutes: {
            '/': rootRouteRef as any,
          },
        },
      ),
    );

  it('should render', async () => {
    const { findByText, queryAllByText } = renderWrapped(<HeatmapPage />);

    expect(await findByText(/Bird's Eye/)).toBeVisible();
    expect(await queryAllByText(/Select a Scorecard/)).toHaveLength(2);
  });
});
