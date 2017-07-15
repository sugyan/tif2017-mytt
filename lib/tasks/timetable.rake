namespace :timetable do
  task main: :environment do
    return if Time.zone.now > Time.zone.local(2017, 8, 6)

    colors = {
      'HOT STAGE'          => '#FA3D56',
      'DOLL FACTORY'       => '#FF88B4',
      'SKY STAGE'          => '#39CDFE',
      'SMILE GARDEN'       => '#B1DD00',
      'FESTIVAL STAGE'     => '#FFDF33',
      'DREAM STAGE'        => '#00C858',
      'INFO CENTRE'        => '#FB3CA6',
      'HEAT GARAGE'        => '#FF783B',
      'フジさんのヨコ STAGE' => '#51D3F8'
    }
    results = []
    open('http://www.idolfes.com/2017/timetable/time.json') do |f|
      JSON.parse(f.read).each do |day, stages|
        date = {
          'day1' => Date.new(2017, 8, 4),
          'day2' => Date.new(2017, 8, 5),
          'day3' => Date.new(2017, 8, 6)
        }[day]
        stages.each do |stage, items|
          items.each do |item|
            id = "#{colors[stage]}-#{item['start']}"
            start_time = Time.zone.strptime("#{date} #{item['start']}", '%Y-%m-%d %H%M')
            end_time   = Time.zone.strptime("#{date} #{item['end']}",   '%Y-%m-%d %H%M')
            results << {
              id: id,
              artist: item['artist'],
              detail: item['detail'],
              start: start_time,
              end: end_time,
              stage: stage,
              color: colors[stage]
            }
          end
        end
      end
    end
    results.sort_by!.with_index { |v, i| [v[:start], i] }
    Rails.cache.write('main', results)
  end
end
