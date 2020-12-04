    export function performanceRate(dificultyLevel, priorityLevel, done) {
      let rate = 0;

      if (dificultyLevel === 'medium') {
        rate = rate + 1;
      } else if (dificultyLevel === 'hard') {
        rate = rate + 2;
      };

      if (priorityLevel === 'normal') {
        rate = rate + 1;
      } else if (priorityLevel === 'urgent') {
        rate = rate + 2;
      };

      if(done) {
        rate = rate + 1;
      } else {
        rate = -1;
      }

      console.log(rate,'rate');
      //setTaskRate(rate);
      return rate;

    }