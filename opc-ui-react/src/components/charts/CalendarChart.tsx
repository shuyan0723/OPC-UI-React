interface CalendarEvent {
  date: number;
  title: string;
  status: 'published' | 'scheduled' | 'draft';
  platform: string;
}

interface CalendarChartProps {
  events: CalendarEvent[];
  month: number;
  year: number;
}

export function CalendarChart({ events, month, year }: CalendarChartProps) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();

  const statusColors = {
    published: '#52c41a',
    scheduled: '#1677ff',
    draft: '#faad14',
  };

  const platformColors = {
    小红书: '#ff2442',
    抖音: '#000000',
    微信: '#07c160',
  };

  const days = [];

  // 空白格子（月初）
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty" />);
  }

  // 日期格子
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = events.filter((e) => e.date === day);

    days.push(
      <div key={`day-${day}`} className="calendar-day">
        <span className="day-number">{day}</span>
        <div className="day-events">
          {dayEvents.slice(0, 3).map((event, i) => (
            <div
              key={i}
              className="event-item"
              style={{
                backgroundColor: `${statusColors[event.status]}15`,
                borderLeft: `3px solid ${statusColors[event.status]}`,
                fontSize: '10px',
                padding: '2px 4px',
                marginBottom: '2px',
                borderRadius: '2px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              title={`${event.title} - ${event.platform}`}
            >
              {event.title}
            </div>
          ))}
          {dayEvents.length > 3 && (
            <div
              className="event-more"
              style={{
                fontSize: '10px',
                color: '#999',
                textAlign: 'center',
              }}
            >
              +{dayEvents.length - 3} 更多
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <style>{`
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }
        .calendar-header {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
          margin-bottom: 8px;
        }
        .calendar-header-cell {
          text-align: center;
          font-weight: 600;
          color: #666;
          padding: 8px;
        }
        .calendar-day {
          min-height: 80px;
          border: 1px solid #e8ebf0;
          border-radius: 8px;
          padding: 8px;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s;
        }
        .calendar-day:hover {
          border-color: #1677ff;
          box-shadow: 0 2px 8px rgba(22, 119, 255, 0.15);
        }
        .calendar-day.empty {
          background: transparent;
          border: none;
          cursor: default;
        }
        .day-number {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          display: block;
          margin-bottom: 4px;
        }
      `}</style>
      <div className="calendar-header">
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
          <div key={day} className="calendar-header-cell">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-grid">{days}</div>
    </div>
  );
}
