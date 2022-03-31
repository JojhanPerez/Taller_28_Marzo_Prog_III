const serieSchema = require("../models/serieModel");
const Boom = require("@hapi/boom");

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
    return serieSchema.findById({ _id: serieId }).then((serieFind) => {
      if (!serieFind) throw Boom.notFound("No se encontro la serie");
      return serieFind;
    });
  }

  async editSerie(
    serieId,
    serie,
    number_seasons,
    original_lenguage,
    features_seasons
  ) {
    return serieSchema.findById({ _id: serieId }).then((serieFind) => {
      if (!serieFind) throw Boom.notFound("No se encontro la serie");
      return serieSchema.updateOne(
        { serieId },
        { serie, number_seasons, original_lenguage, features_seasons }
      );
    });
  }
  async removeSerie(serieId) {
    return serieSchema.findById({ _id: serieId }).then((serieFind) => {
      if (!serieFind) throw Boom.notFound("No se encontro la serie");
      return serieSchema.deleteOne(serieFind);
    });
  }

  async getSeriesActor(actor) {
    const series = await serieSchema.find();
    const matchedSeries = series.filter((serie) =>
      serie.features_seasons.cast.includes(actor)
    );

    if (matchedSeries.length === 0)
      throw Boom.notFound("No se encuentra el actor");
    return matchedSeries;
  }

  async SerieDate(premier_date) {
    const date = await serieSchema
      .find({ "features_seasons.premier_date": premier_date })
      if (date.length === 0) throw Boom.notFound("No se encontro la serie")
      return date

  }
}
module.exports = SeriesService;
