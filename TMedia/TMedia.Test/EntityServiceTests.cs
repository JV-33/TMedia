using Moq;
using Microsoft.EntityFrameworkCore;
using TMedia.Service;
using TMedia.Data;
using TMedia.Models;

namespace TMedia.Test
{
    [TestClass]
    public class EntityServiceTests
    {
        private Mock<IAppDbContext> _mockContext;
        private EntityService<Device> _service;
        private Mock<DbSet<Device>> _mockSet;

        [TestInitialize]
        public void Setup()
        {
            _mockSet = new Mock<DbSet<Device>>();
            _mockContext = new Mock<IAppDbContext>();
            _mockContext.Setup(m => m.Set<Device>()).Returns(_mockSet.Object);
            _service = new EntityService<Device>(_mockContext.Object);
        }

        [TestMethod]
        public async Task GetByIdAsync_ValidId_ReturnsEntity()
        {
            var device = new Device { Id = 1, Name = "Device1" };
            _mockSet.Setup(m => m.FindAsync(1)).ReturnsAsync(device);

            var result = await _service.GetByIdAsync(1);

            Assert.IsNotNull(result);
            Assert.AreEqual("Device1", result.Name);
            _mockSet.Verify(m => m.FindAsync(1), Times.Once());
        }

        [TestMethod]
        public async Task CreateAsync_ValidEntity_AddsAndSavesEntity()
        {
            var device = new Device { Name = "New Device" };
            _mockSet.Setup(m => m.Add(It.IsAny<Device>()));
            _mockContext.Setup(m => m.SaveChangesAsync(default)).ReturnsAsync(1);

            var result = await _service.CreateAsync(device);

            Assert.IsNotNull(result);
            _mockSet.Verify(m => m.Add(It.IsAny<Device>()), Times.Once());
            _mockContext.Verify(m => m.SaveChangesAsync(default), Times.Once());
        }

        [TestMethod]
        public async Task DeleteAsync_ValidId_DeletesAndSavesEntity()
        {
            var device = new Device { Id = 1, Name = "Device1" };
            _mockSet.Setup(m => m.FindAsync(1)).ReturnsAsync(device);
            _mockSet.Setup(m => m.Remove(It.IsAny<Device>()));
            _mockContext.Setup(m => m.SaveChangesAsync(default)).ReturnsAsync(1);

            await _service.DeleteAsync(1);

            _mockSet.Verify(m => m.Remove(It.IsAny<Device>()), Times.Once());
            _mockContext.Verify(m => m.SaveChangesAsync(default), Times.Once());
        }
    }
}