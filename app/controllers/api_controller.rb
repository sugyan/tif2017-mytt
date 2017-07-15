class ApiController < ApplicationController
  def timetable
    @data = Rails.cache.read('main') || []
  end

  # rubocop: disable Metrics/MethodLength, Metrics/AbcSize
  def generate
    days = params['items'].map do |item|
      Time.zone.parse(item['start']).to_date
    end.uniq
    images = days.map do |day|
      title = Magick::Image.new(550, 35)
      Magick::Draw.new.annotate(title, 0, 0, 0, 0, I18n.l(day)) do
        self.font = Rails.root.join('.fonts', 'ipagp.ttf').to_path
        self.pointsize = 15
        self.gravity = Magick::CenterGravity
      end
      rows = params['items'].select { |item| item['day'] == day.strftime('%m-%d') }.map do |item|
        time = format(
          '%s - %s',
          item['start'].in_time_zone.strftime('%H:%M'),
          item['end'].in_time_zone.strftime('%H:%M')
        )
        img = Magick::Image.new(550, 35) do
          self.background_color = item['color']
        end
        Magick::Draw.new.fill('white').roundrectangle(5, 5, 545, 30, 5, 5).draw(img)
        Magick::Draw.new.annotate(img, 0, 0, 10, 24, time) do
          self.pointsize = 15
        end
        Magick::Draw.new.annotate(img, 0, 0, 100, 24, format('[%s]', item['stage'])) do
          self.font = Rails.root.join('.fonts', 'ipagp.ttf').to_path
          self.pointsize = 15
        end
        Magick::Draw.new.annotate(img, 0, 0, 260, 24, item['artist'].tr("\n", ' ')) do
          self.font = Rails.root.join('.fonts', 'ipagp.ttf').to_path
          self.font_weight = Magick::BoldWeight
          self.pointsize = 15
        end
        img
      end
      Magick::ImageList.new.push(title).concat(rows).append(true)
    end
    png = Magick::ImageList.new.concat(images).append(true).to_blob do
      self.format = 'PNG'
    end
    render json: { result: "data:image/png;base64,#{Base64.strict_encode64(png)}" }
  end
end
