import { scale } from '@resolutions';

import colors from './colors';

export default {
  radius2: scale(2),
  radius3: scale(3),
  radius4: scale(4),
  radius6: scale(6),
  radius8: scale(8),
  radius10: scale(10),
  radius14: scale(14),
  radius20: scale(20),
  radius23: scale(23),
  radius25: scale(25),
  radius30: scale(30),
  radius32: scale(32),
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
};
