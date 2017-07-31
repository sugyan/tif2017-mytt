# rubocop:disable Metrics/BlockLength
namespace :timetable do
  task main: :environment do
    return if Time.zone.now > Time.zone.local(2017, 8, 6)

    colors = {
      'HOT STAGE'            => '#FB1A39',
      'HEAT GARAGE'          => '#FF651F',
      'SMILE GARDEN'         => '#9FC700',
      'DOLL FACTORY'         => '#FF6AA2',
      'SKY STAGE'            => '#07C1FE',
      'FESTIVAL STAGE'       => '#FED700',
      'DREAM STAGE'          => '#009C45',
      'フジさんのヨコ STAGE' => '#06708F',
      'INFO CENTRE'          => '#E4007F'
    }
    dates = {
      'day1' => Date.new(2017, 8, 4),
      'day2' => Date.new(2017, 8, 5),
      'day3' => Date.new(2017, 8, 6)
    }
    results = []
    open('http://www.idolfes.com/2017/timetable/time.json') do |f|
      JSON.parse(f.read).each do |day, stages|
        date = dates[day]
        stages.each do |stage, items|
          items.each do |item|
            id = "#{day}-#{colors[stage]}-#{item['start']}"
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
    open('http://www.idolfes.com/2017/greeting/greeting.tsv', 'r:UTF-16') do |f|
      f.read.encode('UTF-8').each_line do |line|
        day, time, *items = line.split(/\t/)
        start_time, end_time = time.split(/～/)
        date = dates[day]
        start_time = Time.zone.strptime("#{date} #{start_time}", '%Y-%m-%d %H：%M')
        end_time   = Time.zone.strptime("#{date} #{end_time}",   '%Y-%m-%d %H：%M')
        items.each.with_index do |item, i|
          next if item.blank?
          stage = format('GREETING AREA (%s)', ('A'.ord + i).chr)
          color = '#808080'
          id = "#{day}-#{color}-#{start_time.strftime('%H%M')}-#{i}"
          results << {
            id: id,
            artist: item,
            detail: 'null',
            start: start_time,
            end: end_time,
            stage: stage,
            color: color
          }
        end
      end
    end
    results.sort_by!.with_index { |v, i| [v[:start], i] }
    Rails.cache.write('main', results)
  end
end
