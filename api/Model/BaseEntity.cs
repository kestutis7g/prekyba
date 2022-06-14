using System.ComponentModel.DataAnnotations;

namespace ShopAPI.Model
{
    public class BaseEntity
    {
        public Guid? Id { get; set; }
    }
}