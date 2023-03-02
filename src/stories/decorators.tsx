import React from 'react';
const styles = {
  transform: 'scale(1)',
  height: '50vh',
  'text-align': 'center',
};
export const wrapper = [(storyFn: any) => <div style={styles}>{storyFn()}</div>];
