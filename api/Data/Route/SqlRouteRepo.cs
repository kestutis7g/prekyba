using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShopAPI.Model;
using Microsoft.EntityFrameworkCore;
using ShopAPI.Context;

namespace ShopAPI.Data.Route
{
    public class SqlRouteRepo : IRouteRepo
    {
        public SqlRouteRepo(ShopContext context)
        {
            _context = context;
        }
        private readonly ShopContext _context;

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<RouteModel>> GetRouteListAsync()
        {
            var routeList = _context.Route.ToList();

            return await Task.FromResult(routeList);
        }

        public async Task<RouteModel> GetRouteByOrderNumberAsync(Guid orderNumber)
        {
            RouteModel route = await _context.Route.FirstOrDefaultAsync(x => x.OrderId == orderNumber);

            return route;
        }

        public async Task CreateRouteAsync(RouteModel routeModel)
        {
            await _context.Route.AddAsync(routeModel);
        }

        public async Task UpdateRouteAsync(RouteModel routeModel)
        {
            await Task.CompletedTask;
        }

        public async Task DeleteRouteAsync(Guid id)
        {
            RouteModel route = await _context.Route.FirstOrDefaultAsync(x => x.Id == id);
            if (route is null)
            {
                throw new ArgumentException(nameof(route));
            }
            await Task.FromResult(_context.Route.Remove(route));

        }

    }
}