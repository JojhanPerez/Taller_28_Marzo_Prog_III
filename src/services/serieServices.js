const serieSchema = require("../models/serieModel");
class SeriesService {
  async createSerie(serie) {
    serie.save();
    return serie;
  }

  async listSeries() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(serieSchema.find()), 3000);
    });
  }

  async showSerie(serieId) {
    return serieSchema.findById({ _id: serieId });
  }
  async editSerie(
    serieId,
    serie,
    number_seasons,
    original_lenguage,
    features_seasons
  ) {
    return serieSchema.updateOne(
      { _id: serieId },
      { serie, number_seasons, original_lenguage, features_seasons }
    );
  }
  async removeSerie(serieId) {
    const serieRemove = serieSchema.findById({ _id: serieId });
    return serieSchema.deleteOne(serieRemove);
  }

  async getSeriesActor(actor) {
    const series = await serieSchema.find();
    const matchedSeries = series.filter((serie) => serie.features_seasons.cast.includes(actor));
    return matchedSeries;
  }

  async SerieDate(premier_date) {
    return serieSchema.find({ 'features_seasons.premier_date' : premier_date });
  }

}
module.exports = SeriesService;
