using TMedia.Controllers;
using TMedia.Core;
using TMedia.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace TMedia.Test
{
    [TestClass]
    public class DevicesControllerTests
    {
        private readonly Mock<IDeviceService> _mockDeviceService;
        private readonly DevicesController _controller;

        public DevicesControllerTests()
        {
            _mockDeviceService = new Mock<IDeviceService>();
            _controller = new DevicesController(_mockDeviceService.Object);
        }

        [TestMethod]
        public async Task GetDevices_ReturnsOkObjectResult_WithListOfDevices()
        {
            var mockDevices = new List<Device>
            {
                new Device { Id = 1, Name = "Device1" },
                new Device { Id = 2, Name = "Device2" }
            };
            _mockDeviceService.Setup(service => service.GetAllDevicesAsync()).ReturnsAsync(mockDevices);

            var result = await _controller.GetDevices();

            Assert.IsInstanceOfType(result.Result, typeof(OkObjectResult));
            var okResult = result.Result as OkObjectResult;
            Assert.IsInstanceOfType(okResult.Value, typeof(List<Device>));
            var devicesList = okResult.Value as List<Device>;
            Assert.AreEqual(2, devicesList.Count);
        }

        [TestMethod]
        public async Task GetDevice_ReturnsNotFound_WhenDeviceDoesNotExist()
        {
            _mockDeviceService.Setup(service => service.GetDeviceByIdAsync(It.IsAny<int>())).ReturnsAsync((Device)null);

            var result = await _controller.GetDevice(3);

            Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
        }

        [TestMethod]
        public async Task PostDevice_WhenCalled_CreatesAndReturnsDevice()
        {
            var newDevice = new Device { Name = "New Device" };
            _mockDeviceService.Setup(service => service.CreateDeviceAsync(It.IsAny<Device>()))
                .ReturnsAsync(new Device { Id = 3, Name = "New Device" });

            var result = await _controller.PostDevice(newDevice);

            var createdAtActionResult = result.Result as CreatedAtActionResult;
            Assert.IsNotNull(createdAtActionResult);
            var createdDevice = createdAtActionResult.Value as Device;
            Assert.IsNotNull(createdDevice);
            Assert.AreEqual("New Device", createdDevice.Name);
        }

        [TestMethod]
        public async Task PutDevice_WithMismatchedId_ReturnsBadRequest()
        {
            var deviceToUpdate = new Device { Id = 1, Name = "Updated Device" };

            var result = await _controller.PutDevice(2, deviceToUpdate);

            Assert.IsInstanceOfType(result, typeof(BadRequestResult));
        }

        [TestMethod]
        public async Task PutDevice_WhenCalled_UpdatesAndReturnsNoContent()
        {
            var deviceToUpdate = new Device { Id = 1, Name = "Updated Device" };
            _mockDeviceService.Setup(service => service.UpdateDeviceAsync(It.IsAny<Device>())).Returns(Task.CompletedTask);
            _mockDeviceService.Setup(service => service.GetDeviceByIdAsync(It.IsAny<int>())).ReturnsAsync(deviceToUpdate);

            var result = await _controller.PutDevice(1, deviceToUpdate);

            Assert.IsInstanceOfType(result, typeof(NoContentResult));
        }

        [TestMethod]
        public async Task DeleteDevice_WhenCalled_DeletesAndReturnsNoContent()
        {
            _mockDeviceService.Setup(service => service.DeleteDeviceAsync(It.IsAny<int>())).Returns(Task.CompletedTask);
            _mockDeviceService.Setup(service => service.GetDeviceByIdAsync(It.IsAny<int>())).ReturnsAsync(new Device());

            var result = await _controller.DeleteDevice(1);

            Assert.IsInstanceOfType(result, typeof(NoContentResult));
        }

        [TestMethod]
        public async Task DeleteDevice_WhenDeviceNotFound_ReturnsNotFound()
        {
            _mockDeviceService.Setup(service => service.DeleteDeviceAsync(It.IsAny<int>()))
                .Throws(new KeyNotFoundException());

            var result = await _controller.DeleteDevice(1);

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }
    }
}