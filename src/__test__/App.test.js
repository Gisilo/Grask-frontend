import React from 'react';

import { create } from "react-test-renderer";

import { EditorScreen } from '../screens/EditorScreen';

test("Matches the snapshot", () => {
    const button = create(<EditorScreen />);
    expect(button.toJSON()).toMatchSnapshot();
  });
