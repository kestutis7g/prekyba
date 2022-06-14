using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;

namespace ShopAPI.Data.Route
{
    public interface IRouteRepo
    {
        Task SaveChangesAsync();
        Task<IEnumerable<RouteModel>> GetRouteListAsync();
        Task<RouteModel> GetRouteByOrderNumberAsync(Guid orderNumber);
        Task CreateRouteAsync(RouteModel routeModel);
        Task UpdateRouteAsync(RouteModel routeModel);
        Task DeleteRouteAsync(Guid id);
    }
}