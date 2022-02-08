import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({events}) => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const getData = () => {
      const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];

      const data = genres.map((genre) => {
        const value = events.filter(({summary}) =>
          summary.split(' ').includes(genre)
        ).length;
        return { name: genre, value };
      });
      return data;
    };
    setData(() => getData());
  }, [events]);

  const colors = ['#ffb347', '#804a00', '#ff990a', '#b86b00', '#ffddad'];

  return (
    <ResponsiveContainer height={400}>
      <PieChart width={400} height={400} className="pie-chart">
        <Pie data={data} cy={200} innerRadius={80} outerRadius={110} fill="#fff" paddingAngle={3}
          dataKey="value" label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenre;