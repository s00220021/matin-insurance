using System.Collections.Generic;
using MongoDB.Driver;
using server.Models;
using MongoDB.Bson;
using System;

namespace server.Services
{

    public class AppointmentService
    {
        private readonly IMongoCollection<Appointment> _Appointments;
        private readonly IMongoCollection<Stats> _Stats;

        public AppointmentService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _Appointments = database.GetCollection<Appointment>("Appointments");
            _Stats = database.GetCollection<Stats>("Stats");
        }
 
        public Appointment Create(Appointment Appointment)
        {
            _Appointments.InsertOne(Appointment);
            Stats stat = _Stats.Find(sub=>sub.type == "active-appointments").SingleOrDefault();
            if(DateTime.Now.AddDays(-7).CompareTo(stat.last_update) > 0){
                stat.previous = stat.value;
                stat.value = 0;
                stat.last_update = DateTime.Now;
            }
            stat.value++;
            _Stats.ReplaceOne(sub => sub.type == "active-appointments", stat);
            return Appointment;
        }

        public List<Appointment> Get() =>
            _Appointments.Find(sub => true).Sort("{date: -1}").ToList();

        public Appointment Get(string id) =>
            _Appointments.Find(sub=>sub.Id == id).SingleOrDefault();

        public void Update(string id, Appointment Appointment) {
            if(Appointment.status == 2){
                Stats stat = _Stats.Find(sub=>sub.type == "active-appointments").SingleOrDefault();
                stat.value--;
                if(DateTime.Now.AddDays(-7).CompareTo(stat.last_update) > 0){
                    stat.previous = stat.value;
                    stat.value = 0;
                    stat.last_update = DateTime.Now.AddDays(-7);
                }
                _Stats.ReplaceOne(sub => sub.type == "active-appointments", stat);
            }
            _Appointments.ReplaceOne(sub => sub.Id == id, Appointment);
        }
            

        public void Delete(string id) =>
            _Appointments.DeleteOne(sub => sub.Id == id);
    }
}